
import { EthInitGuard} from './eth-init.guard';
import { EthDefaultAccountGuard} from './eth-default-account.guard';


export const guards: any[] = [EthInitGuard, EthDefaultAccountGuard];

export * from './eth-init.guard';
export * from './eth-default-account.guard';
