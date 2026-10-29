import { PrimaryBox } from "@/MUIComponents/PrimaryBox";
import { PrimaryContainer } from "@/MUIComponents/PrimaryContainer";
import ItemsSection from "@/sections/ItemsSection/ItemsSection";
import Title from "@/components/Title/Title";

export const metadata = {
  title: "Shop | AlCazar",
  description: "Browse our exclusive collection of Class A premium furniture — sofas, chairs, tables and more.",
};

export default function ShopPage() {
  return (
    <PrimaryBox>
      <PrimaryContainer className={`grid jcs g40 aic`}>
        <ItemsSection editable={false}>
          <Title
            title={"Our Collection"}
            align={"left"}
            line={true}
            fw={700}
            h={"h3"}
          />
        </ItemsSection>
      </PrimaryContainer>
    </PrimaryBox>
  );
}

