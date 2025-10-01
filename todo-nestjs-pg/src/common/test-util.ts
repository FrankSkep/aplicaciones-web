import { Repository, ObjectLiteral } from 'typeorm';

type MockFn<T extends (...a: any[]) => any> = jest.Mock<
    ReturnType<T>,
    Parameters<T>
>;

export type MockRepo<T extends ObjectLiteral> = {
    [P in keyof Repository<T>]: Repository<T>[P] extends (...a: any[]) => any
        ? MockFn<Repository<T>[P]>
        : never;
};

export const createMockRepository = <T extends ObjectLiteral = any>(): MockRepo<T> =>
    ({
        find: jest.fn(),
        findOne: jest.fn(),
        findOneBy: jest.fn(),
        save: jest.fn(),
        create: jest.fn(),
        remove: jest.fn(),
        delete: jest.fn(),
    }) as MockRepo<T>;
