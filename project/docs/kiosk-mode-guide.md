# Kiosk Mode Guide - Montaña Central de Asturias Tourism Portal

## Overview

The interactive kiosk mode transforms the tourism portal into a touch-optimized interface specifically designed for public touchscreen installations in tourist offices, information points, and outdoor kiosks throughout the Central Mountain region of Asturias.

## Features

### 1. Touch-Optimized Interface
- **Large touch targets**: All interactive elements meet or exceed 80x80 pixel minimum size
- **Visual feedback**: Ripple effects and scale animations provide immediate tactile response
- **High contrast colors**: Easy-to-read interface with vibrant, distinct color coding
- **Large typography**: Text sizes optimized for viewing from 60cm distance

### 2. Simplified Navigation
- **Direct access**: 6 main navigation buttons on home screen
- **Persistent home button**: Always visible in header for quick return
- **No complex menus**: Maximum 2 clicks to reach any content
- **Clear visual hierarchy**: Icons and colors help users quickly identify sections

### 3. Session Management
- **Automatic reset**: Returns to home screen after 60 seconds of inactivity
- **Warning countdown**: 10-second warning before reset with large "Continue" button
- **Fresh sessions**: Each new user gets a clean slate
- **Privacy protection**: No data persists between sessions

### 4. Accessibility Tools
- **Text size adjustment**: Three sizes (Normal, Large, Extra Large)
- **High contrast mode**: Yellow on black for visually impaired users
- **Language switcher**: Easy toggle between Spanish and English
- **Screen reader support**: Full ARIA labels and semantic HTML

### 5. Analytics Tracking
- **Session analytics**: Duration, pages visited, interactions counted
- **Page views**: Track most popular content and time on page
- **User behavior**: Language preferences, navigation patterns
- **Timeout analysis**: Identify if sessions end naturally or by timeout

## Modo Kiosko - Activación y Configuración

### Comportamiento por Defecto
**La aplicación inicia automáticamente en modo kiosko** al abrir la URL. No es necesario activar ningún botón ni configuración adicional. Simplemente abre la aplicación y estará lista para usar en modo kiosko.

### Salir del Modo Kiosko (Solo para Administración/Mantenimiento)

Para salir del modo kiosko y acceder al modo web normal (útil para mantenimiento o configuración):

1. **Haz clic 5 veces consecutivas** en el título "Montaña Central de Asturias" en el header del kiosko
2. Aparecerá un **botón rojo "Salir"** parpadeante en la esquina superior derecha
3. Haz clic en el botón "Salir"
4. Confirma la acción en el diálogo que aparece
5. La aplicación volverá al modo web normal

**Notas importantes:**
- El botón "Salir" desaparece automáticamente después de 10 segundos si no se usa
- Los 5 clics deben realizarse en un periodo de 2 segundos
- Esta función está diseñada para ser discreta y evitar salidas accidentales

### Volver al Modo Kiosko desde el Modo Web

Si estás en el modo web normal y deseas volver al modo kiosko:
1. Haz clic en el botón "Kiosk" en el header (visible en vista de escritorio)
2. La aplicación volverá al modo kiosko inmediatamente
3. Se iniciará una nueva sesión de analíticas

### Configuración del Navegador (Instalaciones Permanentes)

Para instalaciones permanentes de kiosko, configura el navegador para:
- Iniciar en modo pantalla completa (fullscreen/kiosk mode)
- Deshabilitar la barra de navegación del navegador
- Recargar automáticamente en caso de errores
- Iniciar automáticamente al encender el dispositivo
- Opcional: Limpiar caché y cookies al reiniciar

## Navigation Structure

### Home Screen Buttons

1. **Accommodation** (Blue)
   - Hotels, rural houses, apartments
   - Filter by location and amenities

2. **Routes** (Green)
   - Hiking trails with difficulty levels
   - GPS tracks and elevation profiles

3. **Gastronomy** (Orange)
   - Local restaurants and specialties
   - Traditional Asturian cuisine

4. **Activities** (Teal)
   - Outdoor adventures
   - Cultural experiences

5. **Events** (Red)
   - Local festivals and celebrations
   - Cultural events calendar

6. **Map** (Cyan)
   - Interactive regional map
   - Points of interest location

## Technical Specifications

### Display Requirements
- **Minimum Resolution**: 1920x1080 (Full HD)
- **Recommended**: 4K display for crystal-clear text and images
- **Touch**: Capacitive touchscreen, 10+ point multi-touch
- **Brightness**: Minimum 350 nit for indoor, 1000+ nit for outdoor

### Browser Requirements
- **Recommended**: Chrome, Edge, or Firefox latest versions
- **JavaScript**: Must be enabled
- **Cookies**: Required for session management
- **Internet**: Stable connection required (offline fallback available)

### Performance
- **Load time**: < 3 seconds on broadband
- **Responsiveness**: < 100ms touch response
- **Memory**: < 200MB RAM usage
- **Battery**: N/A (designed for always-on installation)

## Analytics Dashboard

The kiosk mode includes comprehensive analytics accessible to authenticated users:

### Session Metrics
- Total sessions per day/week/month
- Average session duration
- Sessions ended by timeout vs natural completion
- Language distribution (Spanish vs English)

### Content Performance
- Most viewed pages
- Average time on page
- Navigation flow patterns
- Popular starting points

### Interaction Data
- Button clicks by type
- Language switches
- Accessibility tool usage
- Search queries (if applicable)

### Accessing Analytics
1. Log in with admin credentials
2. Navigate to `/analytics` (requires authentication)
3. Select date range and metrics to view
4. Export data as CSV for detailed analysis

## Maintenance

### Daily
- Check physical condition of touchscreen
- Test touch responsiveness
- Verify internet connection
- Clear any physical obstructions

### Weekly
- Review analytics for unusual patterns
- Check for content updates
- Test all navigation paths
- Verify language switching

### Monthly
- Update content and imagery
- Review and archive old analytics data
- Software updates (if any)
- Deep clean touchscreen

## Troubleshooting

### Screen Not Responding
- Check power and connections
- Restart kiosk device
- Recalibrate touchscreen
- Check browser console for errors

### Slow Performance
- Clear browser cache
- Check internet bandwidth
- Restart browser/device
- Check for background processes

### Analytics Not Recording
- Verify Supabase connection
- Check browser console for errors
- Ensure RLS policies are correct
- Test with authenticated user

### Language Not Switching
- Check i18n configuration
- Verify translation files loaded
- Clear browser cache
- Check network request in DevTools

## Best Practices

### Placement
- Eye-level installation (120-140cm from floor)
- Good lighting, avoid direct sunlight on screen
- Accessible wheelchair height and reach
- Protected from weather if outdoor

### Content Updates
- Refresh featured content weekly
- Update events calendar daily
- Seasonal image rotation
- Keep information current and accurate

### User Experience
- Monitor analytics to identify popular content
- Test all touch targets regularly
- Gather user feedback through surveys
- Iterate based on usage patterns

## Security Considerations

### Physical Security
- Lock down hardware access
- Disable USB ports if possible
- Secure mounting to prevent theft
- Tamper-evident seals

### Software Security
- Disable right-click and developer tools
- Kiosk browser with limited functionality
- Auto-logout from admin areas
- Regular software updates

### Data Privacy
- No personal data collected
- Anonymous session tracking only
- Compliant with GDPR
- Clear privacy notice displayed

## Support

For technical support or questions:
- Email: support@montanacentral.es
- Phone: +34 XXX XXX XXX
- Documentation: /docs/kiosk-mode-guide.md

---

**Version**: 1.0
**Last Updated**: September 2025
**Maintained by**: Montaña Central de Asturias Tourism Board