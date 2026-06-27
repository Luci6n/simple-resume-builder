import { TrashIcon } from "@phosphor-icons/react/dist/csr/Trash";

type TextInputProps = {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  autoComplete?: string;
  max?: string;
  min?: string;
  name?: string;
  placeholder?: string;
  step?: string;
  type?: string;
};

type CheckboxInputProps = {
  checked: boolean;
  label: string;
  onChange: (checked: boolean) => void;
};

type BulletListEditorProps = {
  addButtonClassName?: string;
  items: string[];
  label: string;
  onAdd: () => void;
  onChange: (index: number, value: string) => void;
  onDelete: (index: number) => void;
};

type DeleteButtonProps = {
  children: string;
  onClick: () => void;
};

export function TextInput({
  label,
  value,
  onChange,
  autoComplete,
  max,
  min,
  name,
  placeholder,
  step,
  type = "text",
}: TextInputProps) {
  return (
    <label className="form-label">
      <span className="form-label-text">{label}</span>
      <input
        className="form-input"
        type={type}
        name={name}
        value={value}
        autoComplete={autoComplete}
        max={max}
        min={min}
        step={step}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

export function CheckboxInput({ checked, label, onChange }: CheckboxInputProps) {
  return (
    <label className="form-label">
      <span className="form-label-text">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
    </label>
  );
}

export function BulletListEditor({
  addButtonClassName = "creator-page-button mt-0",
  items,
  label,
  onAdd,
  onChange,
  onDelete,
}: BulletListEditorProps) {
  return (
    <div className="text-soft-black dark:text-soft-milk text-sm">
      <span className="form-label-text">{label}</span>
      <ul>
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 py-1">
            <span className="shrink-0">{"\u2022"}</span>
            <input
              className="form-input flex-1 min-w-0"
              type="text"
              value={item}
              onChange={(event) => onChange(index, event.target.value)}
            />
            <IconDeleteButton onClick={() => onDelete(index)} />
          </li>
        ))}
        <li className="flex items-center gap-2 py-1">
          <span className="shrink-0">{"\u2022"}</span>
          <button type="button" className={addButtonClassName} onClick={onAdd}>
            +
          </button>
        </li>
      </ul>
    </div>
  );
}

export function IconDeleteButton({ onClick }: Pick<DeleteButtonProps, "onClick">) {
  return (
    <button
      type="button"
      className="transition-colors hover:text-red-500 hover:-translate-y-0.5"
      onClick={onClick}
      aria-label="Delete item"
    >
      <TrashIcon size={24} />
    </button>
  );
}

export function SectionDeleteButton({ children, onClick }: DeleteButtonProps) {
  return (
    <button
      type="button"
      className="creator-page-button my-0 mb-3 flex items-center justify-center transition-colors hover:text-red-600 active:text-red-600 focus-visible:text-red-600"
      onClick={onClick}
    >
      <span>{children}</span>
    </button>
  );
}
