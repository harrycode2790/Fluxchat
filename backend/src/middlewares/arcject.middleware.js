import aj from "../lib/arcject.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjectMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 5 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit())
        return res.status(429).json({
          message: "Rate Limit exceeded.",
        });

      if (decision.reason.isBot())
        return res.status(403).json({
          message: "Access denied for bots.",
        });

      return res.status(403).json({
        message: "Request denied by Arcjet.",
      });
    }

    // check for spoofed bot
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({
        error: "spoofed bot detected",
        message: "Spoofed bot detected",
      });
    }

    next();
  } catch (error) {
    console.log("Arcject Protection Error", error);
    next();
  }
};
