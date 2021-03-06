import { getRepository } from "typeorm";
import { Activity, ActivitySettings, ActivityType } from "../entity/Activity";
import { PushNotificationInfo, PushNotificationData } from "../entity/PushNotification";
import { User } from "../entity/User";
import { sendPushNotification } from "./notifications";

export async function createActivity(
    users: User[], type: ActivityType,
    item: { id: string, [key: string]: any }, notification: PushNotificationInfo,
    data: PushNotificationData,
): Promise<void> {
    const activity = new Activity();
    activity.type = type;
    activity.itemId = item.id;
    activity.payload = item;
    activity.users = users;
    if (ActivitySettings[type].persistent) {
        await getRepository(Activity).save(activity);
    }
    if (ActivitySettings[type].pushNotification) {
        for (const user of users) {
            await sendPushNotification(user, activity, notification, { type, ...data });
        }
    }
}
