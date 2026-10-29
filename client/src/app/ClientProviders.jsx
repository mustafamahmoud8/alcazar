"use client";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import DashboardProvider from "@/context/DashboardContext";
import ProfileProvider from "@/context/ProfileContext";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import CartProvider from "@/context/CartContext";
import ItemProvider from "@/context/ItemContext";
import FilterAndSearchAndSortForItemsProvider from "@/context/FilterAndSearchAndSortForItemsContext";
import SubscriptionProvider from "@/context/SubscriptionContext";
import SearchAndSortForUserProvider from "@/context/SearchAndSortForUsersContext";
import SearchAndSortForCategoriesProvider from "@/context/SearchAndSortForCategoriesContext";
import Main from "./Main";

export default function ClientProviders({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <DashboardProvider>
          <ProfileProvider>
            <CartProvider>
              <ItemProvider>
                <FilterAndSearchAndSortForItemsProvider>
                  <SearchAndSortForUserProvider>
                    <SearchAndSortForCategoriesProvider>
                      <SubscriptionProvider>
                        <Main>{children}</Main>
                      </SubscriptionProvider>
                    </SearchAndSortForCategoriesProvider>
                  </SearchAndSortForUserProvider>
                </FilterAndSearchAndSortForItemsProvider>
              </ItemProvider>
            </CartProvider>
          </ProfileProvider>
        </DashboardProvider>
      </Provider>
    </ThemeProvider>
  );
}
