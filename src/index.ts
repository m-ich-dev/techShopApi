// side-effect: расширяет zod прототипом .openapi() до загрузки
// любых zod-схем приложения. Должен идти ПЕРВЫМ импортом.
import "@/boot/docs/openapi-registry.js";
import { serve } from "@/server/server.js";

serve();