import {
    ENGRAVING_TYPE_NEGATIVE,
    ENGRAVING_TYPE_POSITIVE,
    NUM_ENGRAVING_NEGATIVE,
    NUM_ENGRAVING_POSITIVE,
    NUM_SLOTS_DEFAULT,
} from "./consts";

// Utility functions for slot data model

export const initializeDefaultSlots = (length = NUM_SLOTS_DEFAULT) => {
    const SLOTS_DEFAULT = new Array(length).fill(null);

    const slots = [];
    for (let i = 0; i < NUM_ENGRAVING_POSITIVE; i++) {
        slots.push({
            type: ENGRAVING_TYPE_POSITIVE,
            slots: SLOTS_DEFAULT,
        });
    }
    for (let i = 0; i < NUM_ENGRAVING_NEGATIVE; i++) {
        slots.push({
            type: ENGRAVING_TYPE_NEGATIVE,
            slots: SLOTS_DEFAULT,
        });
    }

    return slots;
};

export const deepCopySlots = (slots) => {
    return slots.map((slotRow) => ({ ...slotRow, slots: [...slotRow.slots] }));
};
