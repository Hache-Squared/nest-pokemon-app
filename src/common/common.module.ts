import { Module, Provider } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';
import { HttpAdapter } from './interfaces/http-adapter.interface';

const httpAdapter: Provider = {
    provide: HttpAdapter,
    useClass: AxiosAdapter
}

@Module({
    providers: [
        httpAdapter
    ],
    exports: [httpAdapter]
})
export class CommonModule {}
