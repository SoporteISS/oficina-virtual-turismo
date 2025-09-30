import React, { useEffect } from 'react';

const KeyboardNavigation: React.FC = () => {
  useEffect(() => {
    let focusableElements: NodeListOf<HTMLElement>;
    let currentFocusIndex = -1;

    const updateFocusableElements = () => {
      focusableElements = document.querySelectorAll(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Actualizar elementos enfocables
      updateFocusableElements();

      // Encontrar el índice del elemento actualmente enfocado
      const activeElement = document.activeElement as HTMLElement;
      currentFocusIndex = Array.from(focusableElements).indexOf(activeElement);

      switch (event.key) {
        case 'Tab':
          // El comportamiento por defecto del Tab ya está bien
          break;

        case 'F6':
          // Navegación entre regiones principales
          event.preventDefault();
          navigateToNextRegion(event.shiftKey);
          break;

        case 'Escape':
          // Cerrar modales, menús desplegables, etc.
          event.preventDefault();
          handleEscape();
          break;

        case 'Enter':
        case ' ':
          // Activar elementos interactivos
          if (activeElement && (activeElement.tagName === 'BUTTON' || activeElement.getAttribute('role') === 'button')) {
            event.preventDefault();
            activeElement.click();
          }
          break;

        case 'ArrowDown':
        case 'ArrowUp':
          // Navegación en menús y listas
          if (activeElement?.closest('[role="menu"], [role="listbox"], [role="tree"]')) {
            event.preventDefault();
            navigateInMenu(event.key === 'ArrowDown' ? 1 : -1);
          }
          break;

        case 'Home':
          // Ir al primer elemento enfocable
          if (event.ctrlKey) {
            event.preventDefault();
            focusableElements[0]?.focus();
          }
          break;

        case 'End':
          // Ir al último elemento enfocable
          if (event.ctrlKey) {
            event.preventDefault();
            focusableElements[focusableElements.length - 1]?.focus();
          }
          break;
      }
    };

    const navigateToNextRegion = (reverse: boolean = false) => {
      const regions = document.querySelectorAll('[role="main"], [role="navigation"], [role="banner"], [role="contentinfo"], [role="complementary"]');
      const currentRegion = document.activeElement?.closest('[role]');
      let currentIndex = Array.from(regions).indexOf(currentRegion as Element);
      
      if (reverse) {
        currentIndex = currentIndex <= 0 ? regions.length - 1 : currentIndex - 1;
      } else {
        currentIndex = currentIndex >= regions.length - 1 ? 0 : currentIndex + 1;
      }

      const nextRegion = regions[currentIndex] as HTMLElement;
      const firstFocusable = nextRegion?.querySelector('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])') as HTMLElement;
      
      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        nextRegion?.focus();
      }
    };

    const navigateInMenu = (direction: number) => {
      const menu = document.activeElement?.closest('[role="menu"], [role="listbox"]');
      if (!menu) return;

      const menuItems = menu.querySelectorAll('[role="menuitem"], [role="option"]');
      const currentItem = document.activeElement;
      let currentIndex = Array.from(menuItems).indexOf(currentItem as Element);

      currentIndex += direction;
      if (currentIndex < 0) currentIndex = menuItems.length - 1;
      if (currentIndex >= menuItems.length) currentIndex = 0;

      (menuItems[currentIndex] as HTMLElement)?.focus();
    };

    const handleEscape = () => {
      // Cerrar modales
      const modal = document.querySelector('[role="dialog"][aria-modal="true"]');
      if (modal) {
        const closeButton = modal.querySelector('[aria-label*="cerrar"], [aria-label*="close"]') as HTMLElement;
        closeButton?.click();
        return;
      }

      // Cerrar menús desplegables
      const expandedMenu = document.querySelector('[aria-expanded="true"]');
      if (expandedMenu) {
        (expandedMenu as HTMLElement).click();
        return;
      }

      // Volver al elemento padre enfocable
      const activeElement = document.activeElement as HTMLElement;
      const parent = activeElement?.closest('[tabindex], a, button') as HTMLElement;
      if (parent && parent !== activeElement) {
        parent.focus();
      }
    };

    // Mejorar la visibilidad del foco
    const enhanceFocusVisibility = () => {
      const style = document.createElement('style');
      style.textContent = `
        .enhanced-keyboard *:focus {
          outline: 3px solid #3B82F6 !important;
          outline-offset: 2px !important;
          box-shadow: 0 0 0 2px white, 0 0 0 5px #3B82F6 !important;
        }
        
        .enhanced-keyboard button:focus,
        .enhanced-keyboard a:focus,
        .enhanced-keyboard input:focus,
        .enhanced-keyboard select:focus,
        .enhanced-keyboard textarea:focus {
          background-color: #EBF8FF !important;
        }
      `;
      document.head.appendChild(style);
    };

    // Agregar indicadores de navegación por teclado
    const addKeyboardHints = () => {
      const hint = document.createElement('div');
      hint.id = 'keyboard-navigation-hint';
      hint.className = 'sr-only';
      hint.setAttribute('aria-live', 'polite');
      hint.textContent = 'Navegación por teclado activada. Use Tab para navegar, F6 para cambiar de región, Escape para cerrar menús.';
      document.body.appendChild(hint);
    };

    document.addEventListener('keydown', handleKeyDown);
    enhanceFocusVisibility();
    addKeyboardHints();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      const hint = document.getElementById('keyboard-navigation-hint');
      if (hint) {
        document.body.removeChild(hint);
      }
    };
  }, []);

  return null;
};

export default KeyboardNavigation;