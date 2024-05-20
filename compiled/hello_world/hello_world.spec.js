"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const hello_world_1 = require("./hello_world");
const env_1 = __importDefault(require("env"));
describe("hello world", () => {
    it("greets", () => {
        (0, chai_1.expect)((0, hello_world_1.greet)()).to.equal("Hello World!");
    });
    it("says goodbye", () => {
        (0, chai_1.expect)((0, hello_world_1.bye)()).to.equal("See ya!");
    });
    it("should load test environment variables", () => {
        (0, chai_1.expect)(env_1.default.name).to.equal("test");
        (0, chai_1.expect)(env_1.default.description).to.equal("Add here any environment specific stuff you like.");
    });
});
