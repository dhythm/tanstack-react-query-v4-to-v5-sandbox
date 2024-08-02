import { renderHook, waitFor } from "@testing-library/react";
import { useSomething } from "../useSomething";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

test("useSomething gets an api response", async () => {
  const { result } = renderHook(
    () => {
      const { data, isLoading } = useSomething();
      return {
        isLoading,
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
    expect(result.current.isLoading).toBeTruthy();
  });

  await waitFor(() => {
    expect(result.current.isLoading).toBe(false);
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
