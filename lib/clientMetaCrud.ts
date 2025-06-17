import { ClientMeta } from "./models";
import { ClientMeta as ClientMetaType } from "./types";

export async function createClientMeta(data: ClientMetaType) {
  return await ClientMeta.create({
    ...data,
  });
}

export async function getClientMetaByUserId(UserId: string) {
  return await ClientMeta.findOne({ where: { userId: UserId } });
}

export async function getClientMeta(id: string) {
  return await ClientMeta.findByPk(id);
}

export async function updateClientMeta(id: string, data: ClientMetaType) {
  const clientMeta = await ClientMeta.findByPk(id);
  if (clientMeta) {
    return await clientMeta.update(data);
  }
  return null;
}

export async function deleteClientMeta(id: string) {
  const clientMeta = await ClientMeta.findByPk(id);
  if (clientMeta) {
    await clientMeta.destroy();
    return true;
  }
  return false;
}

export async function getAllClientMeta() {
  return await ClientMeta.findAll();
}
