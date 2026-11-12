import { Fragment, type ReactNode } from 'react';
import { Button, type ButtonVariant } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Chip } from '@/components/ui/Chip';
import { Input } from '@/components/ui/Input';
import { Radio } from '@/components/ui/Radio';
import { Status } from '@/components/ui/Status';
import styles from './UiKitPage.module.css';

const BUTTONS: { name: string; variant: ButtonVariant }[] = [
  { name: 'Primary', variant: 'primary' },
  { name: 'Secondary', variant: 'secondary' },
  { name: 'Outline', variant: 'outline' },
  { name: 'Accent', variant: 'accent' },
];

function Specimen({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <div className={styles.specimen}>
      <p className={styles.caption}>{caption}</p>
      {children}
    </div>
  );
}

function Section({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.h2}>{title}</h2>
      <p className={styles.sectionText}>{text}</p>
      <div className={styles.grid}>{children}</div>
    </section>
  );
}

export function UiKitPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.h1}>Controls &amp; interactions</h1>
        <p className={styles.lead}>
          YuksalUp · navy, white and warm yellow. Every requested state is a native component instance.
        </p>
      </header>

      <Section title="Buttons" text="Four styles × four states. The focus ring has its own clear inset.">
        {BUTTONS.map((b) => (
          <Fragment key={b.name}>
            <Specimen caption={`${b.name} / Default`}>
              <Button variant={b.variant}>Start exploring</Button>
            </Specimen>
            <Specimen caption={`${b.name} / Hover (hover me)`}>
              <Button variant={b.variant}>Start exploring</Button>
            </Specimen>
            <Specimen caption={`${b.name} / Focus (Tab to me)`}>
              <Button variant={b.variant}>Start exploring</Button>
            </Specimen>
            <Specimen caption={`${b.name} / Disabled`}>
              <Button variant={b.variant} disabled>
                Start exploring
              </Button>
            </Specimen>
          </Fragment>
        ))}
      </Section>

      <Section title="Text fields" text="Visible labels, editable values and helpful messages. Error is explained in words.">
        <Specimen caption="Empty">
          <Input label="Email address" placeholder="you@example.com" helperText="Use the email you check regularly." />
        </Specimen>
        <Specimen caption="Filled">
          <Input label="Email address" defaultValue="madina@example.com" helperText="Use the email you check regularly." />
        </Specimen>
        <Specimen caption="Focus (click into it)">
          <Input label="Email address" defaultValue="madina@example.com" helperText="Use the email you check regularly." />
        </Specimen>
        <Specimen caption="Error">
          <Input label="Email address" defaultValue="madina@" error="Error: enter a valid email address." />
        </Specimen>
        <Specimen caption="Disabled">
          <Input label="Email address" defaultValue="madina@example.com" helperText="This field cannot be edited." disabled />
        </Specimen>
      </Section>

      <Section title="Checkboxes" text="Independent selection and disabled states for filters and preferences.">
        <Specimen caption="Selected: No · Disabled: No">
          <Checkbox label="Receive updates" />
        </Specimen>
        <Specimen caption="Selected: No · Disabled: Yes">
          <Checkbox label="Receive updates" disabled />
        </Specimen>
        <Specimen caption="Selected: Yes · Disabled: No">
          <Checkbox label="Receive updates" defaultChecked />
        </Specimen>
        <Specimen caption="Selected: Yes · Disabled: Yes">
          <Checkbox label="Receive updates" defaultChecked disabled />
        </Specimen>
      </Section>

      <Section title="Radio buttons" text="One choice at a time. Selection stays clear without relying on color.">
        <Specimen caption="Selected: No · Disabled: No">
          <Radio name="r1" label="In person" />
        </Specimen>
        <Specimen caption="Selected: No · Disabled: Yes">
          <Radio name="r2" label="In person" disabled />
        </Specimen>
        <Specimen caption="Selected: Yes · Disabled: No">
          <Radio name="r3" label="In person" defaultChecked />
        </Specimen>
        <Specimen caption="Selected: Yes · Disabled: Yes">
          <Radio name="r4" label="In person" defaultChecked disabled />
        </Specimen>
      </Section>

      <Section title="Filter chips" text="Selected and removable combinations.">
        <Specimen caption="Selected: No · Removable: No">
          <Chip label="Technology" />
        </Specimen>
        <Specimen caption="Selected: No · Removable: Yes">
          <Chip label="Technology" removable />
        </Specimen>
        <Specimen caption="Selected: Yes · Removable: No">
          <Chip label="Technology" selected />
        </Specimen>
        <Specimen caption="Selected: Yes · Removable: Yes">
          <Chip label="Technology" selected removable />
        </Specimen>
      </Section>

      <Section title="Status labels" text="Clear words for availability, submissions and review outcomes.">
        <Specimen caption="Open"><Status state="open" /></Specimen>
        <Specimen caption="Submitted"><Status state="submitted" /></Specimen>
        <Specimen caption="Accepted"><Status state="accepted" /></Specimen>
        <Specimen caption="Rejected"><Status state="rejected" /></Specimen>
        <Specimen caption="Closed"><Status state="closed" /></Specimen>
      </Section>
    </main>
  );
}
