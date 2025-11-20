// src/event-bus/inMemoryBus.ts

type EventListener = (data: any) => Promise<void> | void;
const listeners: { [eventName: string]: EventListener[] } = {};

/**
 * Registra um ouvinte (Subscriber) para um tipo de evento.
 * @param eventName O nome do evento a ser ouvido (ex: 'pessoa.criada').
 * @param listener A função a ser executada quando o evento for publicado.
 */
export function subscribe(eventName: string, listener: EventListener): void {
    if (!listeners[eventName]) {
        listeners[eventName] = [];
    }
    listeners[eventName].push(listener);
    console.log(`[EventBus] ${eventName} - Novo ouvinte registrado.`);
}

/**
 * Publica um evento (Publisher), notificando todos os ouvintes registrados.
 * O processamento é assíncrono para simular o desacoplamento de um broker real.
 * @param eventName O nome do evento a ser publicado.
 * @param data Os dados do evento.
 */
export function publish(eventName: string, data: any): void {
    const eventListeners = listeners[eventName] || [];
    
    if (eventListeners.length === 0) {
        console.warn(`[EventBus] Evento "${eventName}" publicado, mas sem ouvintes.`);
        return;
    }

    console.log(`[EventBus] Publicando evento: ${eventName} com ${eventListeners.length} ouvinte(s).`);

    // Dispara todos os ouvintes em background (assincronamente)
   eventListeners.forEach(listener => {
        setTimeout(() => {
            // 🚨 CORREÇÃO 1: Envolve a chamada do listener em Promise.resolve()
            // Isso garante que o resultado seja sempre uma Promise,
            // permitindo o uso seguro do .catch().
            Promise.resolve(listener(data))
                .catch((err: any) => { // 🚨 CORREÇÃO 2: Define o tipo do parâmetro 'err'
                    console.error(`[EventBus] Erro ao processar evento "${eventName}":`, err);
                });
        }, 0);
    });
}