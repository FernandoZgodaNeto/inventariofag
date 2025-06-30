/**
 * Slice da Sidebar - Redux Toolkit
 * Gerencia o estado da barra lateral de navegação
 */

import { createSlice } from "@reduxjs/toolkit";

// Interface para o estado da sidebar
interface SidebarState {
    toggle: boolean;    // Controla visibilidade em dispositivos móveis
    collapsed: boolean; // Controla colapso em desktop
}

// Estado inicial da sidebar
const initialState: SidebarState = {
    toggle: false,
    collapsed: false,
};

// Criação do slice da sidebar
export const SidebarSlice = createSlice({
    name: 'SidebarSlice',
    initialState,
    reducers: {
        /**
         * Alterna a visibilidade da sidebar em dispositivos móveis
         * @param {SidebarState} state - Estado atual
         */
        toggleSidebar(state) {
            state.toggle = !state.toggle
        },
        /**
         * Alterna o estado de colapso da sidebar em desktop
         * @param {SidebarState} state - Estado atual
         */
        collapsedSidebar(state) {
            state.collapsed = !state.collapsed
        },
    }
})

// Exporta as ações do slice
export const { toggleSidebar, collapsedSidebar } = SidebarSlice.actions;

// Seletor para acessar o estado da sidebar
export const SidebarSlicePath = (state: any) => state.SidebarSlice