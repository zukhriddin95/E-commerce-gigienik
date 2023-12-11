import PublicFooter from "@/components/Footer";
import PublicHeader from "@/components/Header";
import childrenType from "@/types/childType";
import { Fragment } from "react";

const PublicLayout = ({ children }: childrenType) => {
  return (
    <Fragment>
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </Fragment>
  );
};

export default PublicLayout;
