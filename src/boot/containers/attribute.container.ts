import AttributeAdminController from "../../http/v1/controllers/admin/attribute.admin.controller";
import AttributeRepository from "../../repositories/attribute/attribute.repository";
import AttributeService from "../../services/attribute.service";
import db from "../database/db.kysely";

const attributeRepository = new AttributeRepository(db);
const attributeService = new AttributeService(attributeRepository);
const attributeAdminController = new AttributeAdminController(attributeService);

export {
    attributeAdminController,
};