import Service from "@/boot/service.js";
import type OrderStatusRepository from "@/repositories/order-status/order-status.repository.js";
import type { TOrderStatusStoreRequest } from "@/http/v1/requests/order-status/order-status.store.request.js";
import type { TOrderStatusUpdateRequest } from "@/http/v1/requests/order-status/order-status.update.request.js";
import type { TPaginateParams } from "@/boot/types/repository.types.js";


export default class OrderStatusService extends Service {
    constructor(private readonly orderStatusRepository: OrderStatusRepository) { super(); }

    public async all({ page, limit, withTrash }: TPaginateParams) {
        return await this.orderStatusRepository.paginate({ page, limit, withTrash });
    }

    public async showById(id: number) {
        return await this.orderStatusRepository.first({ column: 'id', value: id });
    }

    public async store(data: TOrderStatusStoreRequest) {
        return await this.orderStatusRepository.insert(data);
    }

    public async update(data: TOrderStatusUpdateRequest, id: number) {
        return await this.orderStatusRepository.update(data, { column: 'id', value: id });
    }

    public async delete(id: number) {
        await this.orderStatusRepository.delete({ column: 'id', value: id });
        return { success: true };
    }
}