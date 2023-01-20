export type CourseCode = {
    courseCount: number;
    courseName: string;
};

export type RatingDistribution = {
    r5: number;
    r4: number;
    r3: number;
    r2: number;
    r1: number;
    total: number;
};

export type HandleDropdownChangeProp = {
    course?: string;
    rating?: string;
}