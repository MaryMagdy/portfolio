import { test } from "node:test";
import assert from "node:assert/strict";
import { grammars, parse } from "./tagGrammar.ts";

const [equipment, instrument] = grammars;

test("each grammar accepts its own example", () => {
  for (const g of grammars) {
    assert.equal(parse(g.example, g).valid, true, g.example);
  }
});

test("the same input reads differently under each grammar", () => {
  assert.equal(parse("PL1-U200-P-101A", instrument).valid, false);
  assert.equal(parse("30.PIC.1205.B", equipment).valid, false);
});

test("explains each segment of a valid tag", () => {
  const meanings = parse("pl1-u200-p-101a", equipment).segments.map((s) => s.meaning);
  assert.deepEqual(meanings, ["Plant 1", "Unit 200", "Pump", "No. 101, train A"]);
  assert.equal(parse("30.PIC.1205", instrument).segments[1].meaning, "Pressure indicator controller");
});

test("a half-typed last segment is typing, not an error", () => {
  const r = parse("PL1-U2", equipment);
  assert.equal(r.segments[1].status, "typing");
  assert.equal(r.valid, false);
  assert.match(r.problem ?? "", /^Unit:/);
});

test("a wrong earlier segment is an error that names what was expected", () => {
  const r = parse("PL1-X200-P", equipment);
  assert.equal(r.segments[1].status, "error");
  assert.match(r.problem ?? "", /Unit "X200" doesn't fit/);
});

test("an optional last level may be left off", () => {
  const r = parse("30.TT.0042", instrument);
  assert.equal(r.valid, true);
  assert.equal(r.segments[3].status, "skipped");
});

test("rejects parts beyond the last level", () => {
  const r = parse("PL1-U200-P-101-X", equipment);
  assert.equal(r.valid, false);
  assert.deepEqual(r.extra, ["X"]);
});

test("empty input is neither valid nor a problem", () => {
  const r = parse("", equipment);
  assert.equal(r.valid, false);
  assert.equal(r.problem, undefined);
});
