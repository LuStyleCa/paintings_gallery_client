import { AboutPageModel } from "./AboutPage-model";
import { ContactPageModel } from "./ContactPage-model";
import { ImageModel } from "./Image-model";

export interface ContentManagementModel {
  homepagePainting: ImageModel,
  aboutPage: AboutPageModel,
  contactPage: ContactPageModel,
}   