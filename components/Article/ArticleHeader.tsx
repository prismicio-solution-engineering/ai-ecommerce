import { ArticleAuthorDocumentData, ArticleCategoryDocumentData, ArticleDocumentData } from "@/prismicio-types";
import { ContentRelationshipField, isFilled } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { RichText } from "../RichText";

type CategoryFilled = ContentRelationshipField<"article_category"> & {
  data: ArticleCategoryDocumentData;
};

type AuthorField = ContentRelationshipField<"article_author"> & {
    data: ArticleAuthorDocumentData;
};

type Props = {
    data?: ArticleDocumentData;
};

const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options); 
};

const formatReadingTime = (minutes: number) => {
    // Less than a minute
    if (minutes < 1) {
        const seconds = Math.round(minutes * 60);
        return `${seconds} sec read`;
    }
    // Less than an hour
    if (minutes < 60) {
        return `${Math.round(minutes)} min read`;
    }
    // An hour or more
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = Math.round(minutes % 60);
    if (remainingMinutes === 0) {
        return `${hours} h read`;
    }
    return `${hours} h ${remainingMinutes} min read`;
};

export default function ArticleHeader({ data }: Props) {
    if (!data) return null;

    const { title, image, publication_date, reading_time_estimation } = data;
    const category = data.category as CategoryFilled;
    const author = data.author as AuthorField;

    return (
        <header className="w-full max-w-5xl mx-auto py-12 px-4 md:px-8 font-sans">
        
            {/* Category & reading time */}
            <div className="flex items-center gap-4 mb-2 sm:mb-6">
                {isFilled.contentRelationship(category) && isFilled.keyText(category.data.category_name) && (
                <span className="bg-[var(--color-surface)] text-gray-800 text-[12px] sm:text-sm font-medium px-4 py-1.5 rounded-lg">
                    {category.data.category_name}
                </span>
                )}
                {isFilled.number(reading_time_estimation) && (
                <span className="text-gray-900 text-[12px] sm:text-sm font-medium">
                    {formatReadingTime(reading_time_estimation)}
                </span>
                )}
            </div>

            {/* Title */}
            {isFilled.richText(title) && (
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-6 sm:mb-10 [&>h1]:m-0 [&>h2]:m-0">
                <RichText field={title} />
                </div>
            )}

            {/* Image */}
            {isFilled.image(image) && (
                <div className="w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-xl bg-gray-200 mb-10">
                <PrismicNextImage 
                    field={image} 
                    className="w-full h-full object-cover" 
                    fallbackAlt=""
                />
                </div>
            )}

            {/* Publication infos & socials */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                
                {/* Author & date */}
                <div className="flex flex-wrap items-center gap-8 md:gap-12">
                
                {/* Author */}
                {isFilled.contentRelationship(author) && (
                    <div className="flex items-center gap-3">
                    {/* Photo de l'auteur (conservée de votre code initial) */}
                    {isFilled.image(author.data.author_picture) && (
                        <div className="w-10 h-10 overflow-hidden rounded-full bg-gray-200">
                        <PrismicNextImage field={author.data.author_picture} className="w-full h-full object-cover" />
                        </div>
                    )}
                    <div>
                        <p className="text-[12px] sm:text-sm text-gray-500 mb-0.5">Written by</p>
                        {isFilled.keyText(author.data.author_name) && (
                            <p className="text-sm sm:text-[16px] font-semibold text-gray-900">{author.data.author_name}</p>
                        )}
                    </div>
                    </div>
                )}

                {/* Date */}
                {isFilled.date(publication_date) && (
                    <div>
                        <p className="text-[12px] sm:text-sm text-gray-500 mb-0.5">Published on</p>
                        <p className="text-sm sm:text-[16px] font-semibold text-gray-900">{formatDate(publication_date)}</p>
                    </div>
                )}
                </div>

                {/* Socials */}
                <div className="flex items-center gap-5 text-gray-900">
                    <button aria-label="Copy Link" className="hover:cursor-pointer hover:opacity-70 hover:scale-105 transition-all">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                    </button>
                    <button aria-label="Share on LinkedIn" className="hover:cursor-pointer hover:opacity-70 hover:scale-105 transition-all">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    </button>
                    <button aria-label="Share on X" className="hover:cursor-pointer hover:opacity-70 hover:scale-105 transition-all">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"></path><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path></svg>
                    </button>
                    <button aria-label="Share on Facebook" className="hover:cursor-pointer hover:opacity-70 hover:scale-105 transition-all">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </button>
                </div>
                
            </div>
        </header>   
    )
}