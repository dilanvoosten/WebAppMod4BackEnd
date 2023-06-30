import express from "express";

export const oneParam = express.urlencoded({
    extended: false,
    parameterLimit: 1
});

export const twoParam = express.urlencoded({
    extended: false,
    parameterLimit: 2
});

export const threeParam = express.urlencoded({
    extended: false,
    parameterLimit: 3
});

export const sixParam = express.urlencoded({
    extended: false,
    parameterLimit: 6
});
