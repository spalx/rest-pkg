export abstract class BaseError extends Error {
  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }

  abstract get code(): number;
}

export class BadRequestError extends BaseError {
  readonly code: number = 400;
}

export class UnauthorizedError extends BaseError {
  readonly code: number = 401;
}

export class ForbiddenError extends BaseError {
  readonly code: number = 403;
}

export class NotFoundError extends BaseError {
  readonly code: number = 404;
}

export class InternalServerError extends BaseError {
  readonly code: number = 500;
}

const errorMap: Record<number, new (message: string) => BaseError> = {
  400: BadRequestError,
  401: UnauthorizedError,
  403: ForbiddenError,
  404: NotFoundError,
  500: InternalServerError
};

function throwErrorForStatus(statusCode: number, message: string): never {
  const ErrorClass = errorMap[statusCode];
  if (ErrorClass) {
    throw new ErrorClass(message);
  }

  throw new InternalServerError(message);
}
