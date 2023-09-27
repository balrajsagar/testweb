import { CONTRIBUTOR, LIMITED_ACCESS_CONTRIBUTOR, PRODUCT_OWNER, SCRUM_MASTER } from "./Headers";

export let role_array = 
{ "Contributor": CONTRIBUTOR, "Product Owner": PRODUCT_OWNER, "Scrum Master": SCRUM_MASTER, "Limited Access Contributor": LIMITED_ACCESS_CONTRIBUTOR === 'Limited Access Contributor' ? "LA" : LIMITED_ACCESS_CONTRIBUTOR }