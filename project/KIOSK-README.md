# Modo Kiosko - Guía Rápida

## 🚀 Inicio Rápido

**La aplicación inicia automáticamente en modo kiosko.** No necesitas hacer nada especial.

### Para Usar el Kiosko:
1. Abre la aplicación en tu navegador
2. ¡Ya está! La interfaz de kiosko se carga automáticamente
3. Toca cualquier botón grande para explorar

### Para Administradores/Mantenimiento:

#### Salir del Modo Kiosko:
1. Haz **5 clics rápidos** en "Montaña Central de Asturias" (título del header)
2. Aparece un botón rojo "Salir"
3. Haz clic y confirma
4. Ahora estás en modo web normal

#### Volver al Modo Kiosko:
1. En modo web, haz clic en el botón "Kiosk" en el header
2. Listo, vuelves al modo kiosko

## 📋 Características Principales

### ✨ Interface Táctil
- Botones grandes (mínimo 80x80 píxeles)
- Feedback visual inmediato al tocar
- Colores de alto contraste
- Tipografía grande y legible

### ⏱️ Gestión Automática de Sesiones
- Reset automático después de 60 segundos de inactividad
- Advertencia 10 segundos antes del reset
- Botón "Continuar" grande para extender sesión
- Cada usuario obtiene una sesión limpia

### 🎨 Accesibilidad
- 3 tamaños de texto (Normal, Grande, Extra Grande)
- Modo alto contraste
- Cambio de idioma (Español/English)
- Soporte completo para lectores de pantalla

### 📊 Analíticas Automáticas
- Seguimiento de sesiones
- Páginas visitadas
- Interacciones del usuario
- Patrones de uso

## 🎯 Navegación

### Pantalla de Inicio - 6 Botones Principales:

1. **Alojamientos** (Azul)
   - Hoteles, casas rurales, apartamentos

2. **Rutas** (Verde)
   - Senderos con niveles de dificultad

3. **Gastronomía** (Naranja)
   - Restaurantes y especialidades locales

4. **Actividades** (Verde Azulado)
   - Aventuras al aire libre

5. **Eventos** (Rojo)
   - Festivales y celebraciones

6. **Mapa** (Cian)
   - Mapa interactivo de la región

### Botón de Inicio
- Siempre visible en el header
- Te devuelve a la pantalla principal
- Grande y fácil de tocar

## 🔧 Configuración Técnica

### Requisitos Mínimos
- **Pantalla**: Full HD (1920x1080) o superior
- **Táctil**: Capacitiva, multi-touch
- **Navegador**: Chrome, Edge o Firefox (última versión)
- **Conexión**: Internet estable

### Configuración de Navegador Recomendada

#### Chrome/Edge (Recomendado):
```bash
chrome --kiosk --app=https://tu-dominio.com
```

#### Firefox:
```bash
firefox --kiosk https://tu-dominio.com
```

### Configuración del Sistema
- Activar auto-inicio del navegador
- Desactivar protector de pantalla
- Configurar teclado virtual (si es necesario)
- Montar dispositivo de forma segura

## 🛠️ Mantenimiento

### Diario
✓ Verificar funcionamiento general
✓ Limpiar pantalla táctil
✓ Comprobar conexión a internet

### Semanal
✓ Revisar analíticas de uso
✓ Probar todas las rutas de navegación
✓ Verificar actualizaciones de contenido

### Mensual
✓ Actualizar contenido destacado
✓ Revisar y archivar datos analíticos
✓ Limpieza profunda del hardware
✓ Actualizar software (si hay actualizaciones)

## 🐛 Solución de Problemas

### Pantalla No Responde
1. Verificar conexión eléctrica
2. Reiniciar dispositivo
3. Recalibrar pantalla táctil
4. Verificar consola del navegador

### Reset Automático No Funciona
1. Verificar que el modo kiosko está activo
2. Comprobar consola del navegador por errores
3. Limpiar caché y recargar

### Analíticas No Se Guardan
1. Verificar conexión a Supabase
2. Comprobar políticas RLS
3. Ver errores en consola del navegador
4. Verificar que la sesión se inició correctamente

### No Puedo Salir del Modo Kiosko
1. Asegúrate de hacer 5 clics rápidos (en 2 segundos)
2. El botón "Salir" aparece por 10 segundos
3. Si expira, repite los 5 clics
4. Alternativa: Reiniciar navegador y limpiar localStorage

## 📚 Documentación Completa

Para información más detallada, consulta:
- `/docs/kiosk-mode-guide.md` - Guía completa del modo kiosko
- `/docs/kiosk-implementation-summary.md` - Resumen técnico de implementación
- `/docs/technical-guide.md` - Guía técnica general del proyecto

## 🆘 Soporte

### Contacto
- **Email**: support@montanacentral.es
- **Teléfono**: +34 XXX XXX XXX
- **Horario**: Lunes a Viernes, 9:00 - 18:00

### Recursos en Línea
- Repositorio GitHub: [enlace]
- Panel de Analíticas: [enlace a dashboard]
- Base de Conocimiento: [enlace]

---

## 🎓 Tips para Personal de Turismo

### Presentando el Kiosko a Visitantes
- "Toca cualquier botón para comenzar"
- "El mapa te muestra dónde estamos"
- "Puedes cambiar el idioma arriba"
- "Si necesitas texto más grande, usa el botón con 'A'"

### Reinicio Manual Rápido
- Espera 60 segundos sin tocar nada
- O toca 5 veces el título y sal/vuelve a entrar

### Cambiar Idioma
- Botón con globo terráqueo en la esquina superior derecha
- Alterna entre Español (ES) y English (EN)

---

**Versión**: 2.0
**Última Actualización**: Septiembre 2025
**Montaña Central de Asturias - Turismo Inteligente**