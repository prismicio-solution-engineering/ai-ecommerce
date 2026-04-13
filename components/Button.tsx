import { PrismicNextLink } from "@prismicio/next";
import type { LinkField, ContentRelationshipField } from "@prismicio/client";
import * as prismic from "@prismicio/client";

type LinkVariant = "Primary" | "Secondary";

type BaseProps = {
  variant?: LinkVariant;
  className?: string;
  children?: React.ReactNode;
};

type AsLinkProps = BaseProps & {
  field: LinkField;
};

type AsRelationshipProps = BaseProps & {
  field: ContentRelationshipField;
};

type AsButtonProps = BaseProps & {
  field?: undefined;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
};

type Props = AsLinkProps | AsRelationshipProps | AsButtonProps;

const variantStyles: Record<LinkVariant, string> = {
  Primary:
    "inline-flex items-center justify-center gap-2 rounded bg-[var(--color-button-primary-bg)] px-6 py-3 text-[var(--color-button-primary-text)] font-medium transition-opacity hover:opacity-90",
  Secondary:
    "inline-flex items-center justify-center gap-2 rounded border border-[var(--color-button-secondary-border)] bg-[var(--color-button-secondary-bg)] px-6 py-3 text-[var(--color-button-secondary-text)] font-medium transition-opacity hover:opacity-90",
};

function resolveVariant(field?: LinkField | ContentRelationshipField, variant?: LinkVariant): LinkVariant {
  if (variant) return variant;
  const fieldVariant = (field as LinkField & { variant?: string })?.variant;
  if (fieldVariant && fieldVariant in variantStyles) return fieldVariant as LinkVariant;
  return "Primary";
}

export function Button(props: Props) {
  const { className, children } = props;

  // Native <button> when no field is provided
  if (!props.field) {
    const { type = "button", onClick, disabled } = props as AsButtonProps;
    const resolved = resolveVariant(undefined, props.variant);
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={className ?? variantStyles[resolved]}
      >
        {children}
      </button>
    );
  }

  // Link or ContentRelationship → PrismicNextLink
  const field = props.field;
  if (!prismic.isFilled.link(field)) return null;

  const resolved = resolveVariant(field, props.variant);

  return (
    <PrismicNextLink
      field={field}
      className={className ?? variantStyles[resolved]}
    />
  );
}
