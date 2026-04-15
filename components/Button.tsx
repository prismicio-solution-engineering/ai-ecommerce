import { PrismicNextLink } from "@prismicio/next";
import type { LinkField, ContentRelationshipField } from "@prismicio/client";
import * as prismic from "@prismicio/client";

type LinkVariant = "Primary" | "Secondary";

type BaseProps = {
  variant?: LinkVariant;
  className?: string;
  children?: React.ReactNode;
  alternative?: boolean;
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
    "inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[var(--color-button-primary-bg)] bg-[var(--color-button-primary-bg)] px-6 py-3 text-[var(--color-button-primary-text)] font-medium transition-all shadow-[0px_12px_16px_-4px_#00000019] hover:opacity-90 hover:scale-105",
  Secondary:
    "inline-flex items-center justify-center gap-2 rounded-lg border-2 border-[var(--color-button-secondary-border)] bg-[var(--color-button-secondary-bg)] px-6 py-3 text-[var(--color-button-secondary-text)] font-medium transition-all shadow-[0px_12px_16px_-4px_#00000019] hover:opacity-90 hover:scale-105",
};

const alternativeStyles: Record<LinkVariant, string> = {
  Primary:
    "inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white bg-white px-6 py-3 text-black font-medium transition-all shadow-[0px_12px_16px_-4px_#00000019] hover:bg-white/90 hover:scale-105",
  Secondary:
    "inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white bg-transparent px-6 py-3 text-white font-medium transition-all shadow-[0px_12px_16px_-4px_#00000019] hover:bg-white/10 hover:scale-105",
};

function resolveVariant(field?: LinkField | ContentRelationshipField, variant?: LinkVariant): LinkVariant {
  if (variant) return variant;
  const fieldVariant = (field as LinkField & { variant?: string })?.variant;
  if (fieldVariant && fieldVariant in variantStyles) return fieldVariant as LinkVariant;
  return "Primary";
}

export function Button(props: Props) {
  const { className, children, alternative = false } = props;

  const activeStyles = alternative ? alternativeStyles : variantStyles;

  // Native <button> when no field is provided
  if (!props.field) {
    const { type = "button", onClick, disabled } = props as AsButtonProps;
    const resolved = resolveVariant(undefined, props.variant);
    const finalClass = className ?? activeStyles[resolved]
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={finalClass}
      >
        {children}
      </button>
    );
  }

  // Link or ContentRelationship → PrismicNextLink
  const field = props.field;
  if (!prismic.isFilled.link(field)) return null;

  const resolved = resolveVariant(field, props.variant);
  const finalClass = className ?? activeStyles[resolved]

  return (
    <PrismicNextLink
      field={field}
      className={finalClass}
    />
  );
}
