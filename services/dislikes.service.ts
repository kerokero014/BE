import {
    addDislike,
    removeDislike,
    getDislikesByUserId,
    updateDislike,
} from '../models/dislike.model';

export const addDislikeService = async (userId: number, dislikeName: string) => {
    // Check if dislike already exists for the user
    const existingDislike = await getDislikesByUserId(userId);
    if (existingDislike.some((dislike) => dislike.name === dislikeName)) {
        throw new Error('Dislike already exists for the user');
    }

    return addDislike(userId, dislikeName);
};

export const removeDislikeService = async (userId: number, dislikeId: number) => {
    return removeDislike(userId, dislikeId);
};

export const getDislikesByUserIdService = async (userId: number) => {
    return getDislikesByUserId(userId);
};

export const updatedDislikeService = async (
    userId: number,
    dislikeId: number,
    newDislikeName: string,
) => {
    return updateDislike(userId, dislikeId, newDislikeName);
};
