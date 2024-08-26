import { SetMetadata } from '@nestjs/common';
import { SKIP_AUTH } from '../constantsAuth/constantsAuth';

export const SkipAuth = () => SetMetadata(SKIP_AUTH, true);
