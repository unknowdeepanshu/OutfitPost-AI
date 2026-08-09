export type TaskResultResponse<TResult> = {
  data: {
    task_status: string;
    results: TResult;
    error?: string | null;
  };
};

export interface WaitForTaskOptions {
  maxRetries?: number;
  delayMs?: number;
  successStatus?: string;
  failureStatuses?: string[];
  timeoutMessage?: string;
  failureMessage?: string;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function waitForTaskResult<TResult>(
  taskId: string,
  getTaskResult: (taskId: string) => Promise<TaskResultResponse<TResult>>,
  options: WaitForTaskOptions = {},
) {
  const {
    maxRetries = 10,
    delayMs = 4000,
    successStatus = "success",
    failureStatuses = ["error"],
    timeoutMessage = "Image generation timeout.",
    failureMessage = "Image generation failed.",
  } = options;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const response = await getTaskResult(taskId);
    console.log(response);
    if (response.data.task_status === successStatus) {
      return response.data.results;
    }

    if (failureStatuses.includes(response.data.task_status)) {
      throw new Error(response.data.error ?? failureMessage);
    }

    await sleep(delayMs);
  }

  throw new Error(timeoutMessage);
}

export default waitForTaskResult;
