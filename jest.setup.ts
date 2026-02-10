import "@testing-library/jest-dom";

// Mock Next.js navigation
jest.mock("next/navigation", () =>
  require("./__mocks__/nextNavigation"),
);

// Disable Framer Motion animations
jest.mock("framer-motion", () => {
  const React = require("react");

  return {
    motion: {
      div: React.forwardRef(
        (
          props: React.HTMLAttributes<HTMLDivElement>,
          ref: React.Ref<HTMLDivElement>,
        ) => React.createElement("div", { ref, ...props }),
      ),
    },  
  };
});
