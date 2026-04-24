export interface UserReview {
    id: string;
    productId: string;
    userName: string;
    userImageUrl: string;
    rating: number;
    comment: string;
    title: string;
    reviewDate: Date;
}

export interface OptionItem {
    label: string;
    value: number | string;
}

export type AddReviewParams = Pick<UserReview, 'productId' | 'rating' | 'comment' | 'title'>;