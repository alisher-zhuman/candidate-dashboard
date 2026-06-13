import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// jsdom не предоставляет TextEncoder/TextDecoder, нужные react-router v7
Object.assign(globalThis, { TextEncoder, TextDecoder });
