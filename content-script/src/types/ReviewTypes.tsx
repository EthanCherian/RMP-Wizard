export type HeaderProps = {
    class: string;
    date: string;
    qualityRating: number;
}

export type ReviewInfoProps = {
    isForCredit?: boolean;
    attendanceMandatory?: string;
    wouldTakeAgain?: number;
    grade?: string;
    textbookUse?: number;
    isForOnlineClass?: boolean;
}

export type TagProps = {
    ratingTags: string;
}

export type RatingProps = {
    qualityRating: number;
    difficultyRating: number;
};

export type FooterProps = {
    thumbsUpTotal: number;
    thumbsDownTotal: number;
    teacherId: number;
    ratingId: number;
}

type NodeExtraInfo = {
    legacyId: number;
    helpfulRating: number;
    clarityRating: number;
  }

export type ReviewProps = {
    comment: string;
    ratingTags: string;
} & RatingProps & HeaderProps & ReviewInfoProps & FooterProps;

export type ReviewRMP = {
    node: Exclude<ReviewProps & NodeExtraInfo, FooterProps['teacherId']>;
    qualityRating: never;
}

export type ReviewPlus = {
    Id: number;
    ratingTags: string;
    wouldTakeAgain: number;
    comment: string;
    date: string;
    grade: string;
    isForCredit: boolean;
    class: string;
    isForOnlineClass: boolean;
    attendanceMandatory: string;
    difficultyRating: number;
    qualityRating: string;
    textbookUse: number;
    thumbsUpTotal: number;
    thumbsDownTotal: number;
    node: never;
};

export type ReviewElement = ReviewPlus | ReviewRMP;