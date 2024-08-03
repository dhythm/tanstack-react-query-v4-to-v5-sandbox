import { renderHook, waitFor } from "@testing-library/react";
import { useSomething } from "../useSomething";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

test("useSomething gets an api response", async () => {
  const { result } = renderHook(
    () => {
      const { data, isPending } = useSomething();
      return {
        isPending,
        data,
      };
    },
    {
      wrapper: ({ children }) => (
        <QueryClientProvider
          client={
            new QueryClient({
              defaultOptions: {
                queries: {
                  retry: false,
                },
              },
            })
          }
        >
          {children}
        </QueryClientProvider>
      ),
    }
  );

  await waitFor(() => {
    expect(result.current.isPending).toBeTruthy();
  });

  await waitFor(() => {
    expect(result.current.isPending).toBe(false);
  });

  expect(result.current.data).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        url: expect.any(String),
        width: expect.any(Number),
        height: expect.any(Number),
      }),
    ])
  );
});
