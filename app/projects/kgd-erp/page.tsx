import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Text, MonoLabel, Heading } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import {
  CaseStudyHero,
  CaseStudySection,
  Figure,
  DefinitionList,
  type DefinitionItem,
} from "@/components/case-study";
import {
  ManufacturingWorkflowDiagram,
  InvoicePaymentDiagram,
  LedgerTimelineDiagram,
  InventoryMovementDiagram,
} from "@/components/projects/kgd-erp";
import { PROJECTS } from "@/content/projects";

const project = PROJECTS.find((p) => p.slug === "kgd-erp");

export const metadata: Metadata = {
  title: "KGD ERP — Manufacturing Operations Platform",
  description:
    "Case study: a lightweight ERP for a real manufacturing business — invoice lifecycle, payment allocation, an immutable customer ledger, and inventory synchronization held together by database transactions.",
};

const ENTITIES: { name: string; detail: string }[] = [
  { name: "Customer", detail: "The buyer, carrying a running ledger balance derived from entries." },
  { name: "Order", detail: "A request that draws on finished stock and drives billing." },
  { name: "Invoice", detail: "A billed amount with a strict lifecycle: draft → issued → paid." },
  { name: "Payment", detail: "Money received, allocated across one or more open invoices." },
  { name: "Ledger entry", detail: "An immutable debit or credit posting; the balance is their sum." },
  { name: "Inventory item", detail: "A stocked material or finished product." },
  { name: "Stock movement", detail: "An append-only record of every increase or decrease." },
  { name: "Audit event", detail: "Who changed what, and when — recorded for every operation." },
];

const TRADEOFFS: DefinitionItem[] = [
  {
    term: "One transactional database over distributed services",
    body: "At this scale, a single relational database with ACID transactions is simpler and safer than splitting money and stock across services that would then need sagas and compensation to stay consistent.",
  },
  {
    term: "Append-only tables, not a separate event-sourcing platform",
    body: "Immutable ledger entries and stock movements give the audit trail and reconstruction benefits without operating a dedicated event store.",
  },
  {
    term: "Oldest-first auto-allocation with manual override",
    body: "A sensible default settles most payments correctly; a full allocation-rule engine wasn't worth the complexity for the cases that actually occur.",
  },
  {
    term: "Reporting computed on read, not streamed",
    body: "Operational views are derived from the authoritative tables when asked for. A streaming analytics pipeline would add moving parts the business doesn't yet need.",
  },
  {
    term: "Role-level access, not per-field permissions",
    body: "Coarse roles match how the business actually works — office versus floor — without the overhead of per-field permissioning.",
  },
];

const SCALING: DefinitionItem[] = [
  {
    term: "Snapshot balances and on-hand quantities",
    body: "Cache periodic ledger and inventory snapshots so summing the full history stays off the hot path as entry and movement counts grow.",
  },
  {
    term: "Background jobs for heavy reporting",
    body: "Move month-end statements and reconciliation runs to workers so they don't contend with transactional load.",
  },
  {
    term: "Read replicas for the dashboard",
    body: "Route reporting reads to replicas, keeping the primary — the transactional core — focused on writes.",
  },
  {
    term: "Partition the append-only tables",
    body: "Time-partition ledger entries and stock movements and archive closed periods to keep indexes fast.",
  },
  {
    term: "Idempotency keys on money operations",
    body: "Make invoice and payment writes safe to retry as more clients and integrations reach the API.",
  },
  {
    term: "Continuous invariant checks",
    body: "Assert that ledger sums match invoice balances and stock sums match on-hand, alerting on any drift before it becomes a dispute.",
  },
];

const WOULD_CHANGE = [
  "Define the ledger-entry and stock-movement schemas — and their reversal semantics — before building any UI on top of them.",
  "Add reconciliation assertions as automated checks from day one, rather than as a later safety net.",
  "Introduce balance and on-hand snapshots earlier; summing history is fine until suddenly it isn't.",
];

export default function KgdErpCaseStudy() {
  if (!project) notFound();

  return (
    <>
      <CaseStudyHero
        name={project.name}
        kind={project.kind}
        status={project.status}
        positioning={project.positioning}
        focus={project.focus}
        meta={[
          { label: "Role", value: "Solo engineer" },
          { label: "Domain", value: "Manufacturing operations" },
          { label: "Core", value: "Relational DB · transactional backend" },
        ]}
      />

      <CaseStudySection
        index="01"
        title="The problem"
        lead="A real manufacturing business was running its operations across spreadsheets, paper, and memory."
      >
        <div className="max-w-2xl space-y-5">
          <Text>
            Orders, invoices, payments, customer balances, and stock each lived
            somewhere different. An invoice was recorded in one place, the
            payment against it in another, and the stock it consumed in a third
            — so the numbers drifted. No one could reliably answer the questions
            an operation runs on: what does this customer actually owe, and
            what&apos;s really in inventory right now?
          </Text>
          <Text>
            The goal was a single transactional system — a lightweight ERP for
            the business — where money and materials stay consistent, every
            change is auditable, and the dashboard is the same source of truth
            the office and the floor both trust.
          </Text>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="02"
        title="System model"
        lead="The operation modeled as a small set of entities, with money and materials represented as immutable history rather than editable numbers."
      >
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {ENTITIES.map((entity) => (
            <li key={entity.name}>
              <Reveal mode="rise">
                <Card variant="outline" padding="md" className="h-full">
                  <MonoLabel className="text-accent-strong">
                    {entity.name}
                  </MonoLabel>
                  <Text className="mt-2 text-sm">{entity.detail}</Text>
                </Card>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Figure
            label="Operational flow"
            aspect="aspect-[20/5]"
            caption="Raw materials become finished stock, sold against an order, billed on an invoice, settled by a payment, and posted to the customer ledger — one continuous flow from materials to money."
          >
            <ManufacturingWorkflowDiagram />
          </Figure>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="03"
        title="Architecture"
        lead="An operational dashboard over a transactional backend, with one relational database as the system of record."
      >
        <div className="max-w-2xl space-y-5">
          <Text>
            The dashboard is the command center — invoices, payments, customer
            balances, and stock in one place. Behind it, every operation that
            touches money or materials runs inside a single database
            transaction: an invoice and its ledger entry, a payment with its
            allocations and entries, a sale with its stock movement all commit
            together or not at all.
          </Text>
          <Text>
            The relational database is the system of record, and its constraints
            — foreign keys, checks, and unique indexes — keep the system&apos;s
            invariants honest rather than trusting application code to remember
            them. An append-only audit log records every state change, so the
            history of who did what is never lost.
          </Text>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="04"
        title="Invoice + payment flow"
        lead="Invoices follow a strict lifecycle; payments are allocations, not fields."
      >
        <div className="max-w-2xl space-y-5">
          <Text>
            An invoice moves through a defined lifecycle — draft, issued,
            partially paid, paid — with void as a terminal exception. Its paid
            and outstanding amounts are always derived from the allocations
            against it, never edited by hand.
          </Text>
          <Text>
            A payment isn&apos;t tied to a single invoice. It&apos;s an amount
            received that gets allocated across a customer&apos;s open invoices —
            oldest-first by default, or manually when needed — so partial
            payments and overpayments are handled explicitly. Each allocation
            posts a ledger entry in the same transaction, so the books and the
            invoices can never disagree.
          </Text>
        </div>

        <div className="mt-10">
          <Figure
            label="Payment allocation"
            aspect="aspect-[16/6]"
            caption="One payment, split across open invoices oldest-first, each allocation posting an entry to the customer ledger."
          >
            <InvoicePaymentDiagram />
          </Figure>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="05"
        title="Ledger consistency"
        lead="The customer ledger is the financial source of truth — an append-only series, not a mutable balance."
      >
        <div className="max-w-2xl space-y-5">
          <Text>
            Every billable or payment event appends an immutable debit or credit
            entry; the balance is the running sum of entries, not a field someone
            updates. Because entries are never edited or deleted — corrections
            post reversing entries instead — the history reconstructs exactly how
            a balance was reached.
          </Text>
          <Text>
            Invoice issuance, payment allocation, and adjustments all write their
            ledger entries inside the same transaction as the operation that
            caused them. The ledger can never quietly disagree with the invoices
            and payments behind it.
          </Text>
        </div>

        <div className="mt-10">
          <Figure
            label="Ledger timeline"
            aspect="aspect-[18/7]"
            caption="Invoices post debits, payments post credits, and the running balance is the sum of entries — append-only, with corrections as reversing entries."
          >
            <LedgerTimelineDiagram />
          </Figure>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="06"
        title="Inventory synchronization"
        lead="Stock is modeled as movements, so sales and inventory stay reconcilable by construction."
      >
        <div className="max-w-2xl space-y-5">
          <Text>
            Stock isn&apos;t a single editable count. Production, sales, returns,
            and adjustments each append a stock movement, and on-hand quantity is
            the sum of an item&apos;s movements. Nothing changes inventory without
            leaving a record of why.
          </Text>
          <Text>
            Sales and inventory stay in sync because a fulfilled order&apos;s
            stock movement is written in the same transaction as its invoice —
            you can&apos;t bill without decrementing stock, and you can&apos;t
            decrement stock without a reason. The dashboard&apos;s numbers stay
            reconcilable against the movement history at any time.
          </Text>
        </div>

        <div className="mt-10">
          <Figure
            label="Inventory movement"
            aspect="aspect-[16/5]"
            caption="Production and returns append inflows; sales and adjustments append outflows; on-hand is their sum — and the sale movement commits with the invoice."
          >
            <InventoryMovementDiagram />
          </Figure>
        </div>
      </CaseStudySection>

      <CaseStudySection
        index="07"
        title="Tradeoffs"
        lead="What was deliberately left simple. For a system of record, fewer moving parts is a feature."
      >
        <DefinitionList items={TRADEOFFS} />
      </CaseStudySection>

      <CaseStudySection
        index="08"
        title="Scaling to 10x"
        lead="None of this is built yet — it's where the transactional core would bend first, and how it would adapt."
      >
        <DefinitionList items={SCALING} />
      </CaseStudySection>

      <CaseStudySection index="09" title="Reflection" divider>
        <div className="max-w-2xl space-y-5">
          <Text>
            Modeling money and materials as append-only postings and movements —
            rather than editable numbers — was the decision that made everything
            else trustworthy. Once balances and stock were derived from immutable
            history inside transactions, a whole class of &ldquo;the numbers
            don&apos;t match&rdquo; bugs simply couldn&apos;t happen.
          </Text>
          <Text>
            Treating a payment as an allocation across invoices, rather than a
            field on one, matched how the business actually thinks about who owes
            what — and made partial payments and overpayments ordinary instead of
            special cases.
          </Text>
        </div>

        <div className="mt-10 max-w-2xl">
          <Heading level={3} className="text-h3">
            What I would change
          </Heading>
          <ul className="mt-6 space-y-4">
            {WOULD_CHANGE.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent shadow-[0_0_8px_var(--accent-glow)]"
                />
                <Text className="text-sm md:text-base">{item}</Text>
              </li>
            ))}
          </ul>
        </div>
      </CaseStudySection>

      <Section divider className="text-center">
        <Reveal mode="rise" className="mx-auto max-w-xl">
          <Heading level={2}>See the rest of the work.</Heading>
          <Text className="mx-auto mt-5 max-w-md">
            Each project is documented end to end — problem, architecture,
            tradeoffs, and scaling. Browse them all.
          </Text>
          <div className="mt-8 flex justify-center">
            <Button href="/projects" variant="secondary">
              All projects
            </Button>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
