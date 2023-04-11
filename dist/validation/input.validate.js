"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdate = exports.validateInput = void 0;
const zod_1 = require("zod");
/**
 * Validate input
 * Validate updates
 */
const validateInput = (newBookInput) => {
    try {
        validateInputSchema.parse(newBookInput);
        return true;
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            console.log(error.issues);
            return false;
        }
    }
    return false;
};
exports.validateInput = validateInput;
const validateUpdate = (bookUpdateInput) => {
    try {
        validateUpdateSchema.parse(bookUpdateInput);
        return true;
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            console.log(error.issues);
            return false;
        }
    }
    return false;
};
exports.validateUpdate = validateUpdate;
const validateInputSchema = zod_1.z.object({
    author: zod_1.z.string(),
    title: zod_1.z.string(),
    pages: zod_1.z.number(),
    year: zod_1.z.number(),
});
const validateUpdateSchema = zod_1.z.object({
    author: zod_1.z.string().optional(),
    title: zod_1.z.string().optional(),
    pages: zod_1.z.number().optional(),
    year: zod_1.z.number().optional(),
});
