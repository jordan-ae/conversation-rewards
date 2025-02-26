import { Static, Type } from "@sinclair/typebox";
import { CommentType } from "./comment-types";

const type = Type.Union([...Object.keys(CommentType).map((key) => Type.Literal(key as keyof typeof CommentType))]);

export const formattingEvaluatorConfigurationType = Type.Object({
  /**
   * Enables or disables this module
   */
  enabled: Type.Boolean({ default: true }),
  /**
   * Multipliers applied to different parts of the comment body content
   */
  multipliers: Type.Array(
    Type.Object({
      type: Type.Array(type),
      formattingMultiplier: Type.Number(),
      wordValue: Type.Number(),
    }),
    {
      default: [
        {
          type: ["ISSUE", "ISSUER", "SPECIFICATION"],
          formattingMultiplier: 1,
          wordValue: 0.1,
        },
        {
          type: ["ISSUE", "ISSUER", "COMMENTED"],
          formattingMultiplier: 1,
          wordValue: 0.2,
        },
        {
          type: ["ISSUE", "ASSIGNEE", "COMMENTED"],
          formattingMultiplier: 0,
          wordValue: 0,
        },
        {
          type: ["ISSUE", "COLLABORATOR", "COMMENTED"],
          formattingMultiplier: 1,
          wordValue: 0.1,
        },
        {
          type: ["ISSUE", "CONTRIBUTOR", "COMMENTED"],
          formattingMultiplier: 0.25,
          wordValue: 0.1,
        },
        {
          type: ["REVIEW", "ISSUER", "TASK"],
          formattingMultiplier: 0,
          wordValue: 0,
        },
        {
          type: ["REVIEW", "ISSUER", "COMMENTED"],
          formattingMultiplier: 2,
          wordValue: 0.2,
        },
        {
          type: ["REVIEW", "ASSIGNEE", "COMMENTED"],
          formattingMultiplier: 1,
          wordValue: 0.1,
        },
        {
          type: ["REVIEW", "COLLABORATOR", "COMMENTED"],
          formattingMultiplier: 1,
          wordValue: 0.1,
        },
        {
          type: ["REVIEW", "CONTRIBUTOR", "COMMENTED"],
          formattingMultiplier: 0.25,
          wordValue: 0.1,
        },
      ],
    }
  ),
  /**
   * Attributed score per HTML entity
   */
  scores: Type.Record(Type.String(), Type.Number(), {
    default: {
      br: 0,
      code: 1,
      p: 1,
      em: 0,
      img: 0,
      strong: 0,
      blockquote: 0,
      h1: 1,
      h2: 1,
      h3: 1,
      h4: 1,
      h5: 1,
      h6: 1,
      a: 1,
      li: 1,
      td: 1,
      hr: 0,
    },
  }),
});

export type FormattingEvaluatorConfiguration = Static<typeof formattingEvaluatorConfigurationType>;
