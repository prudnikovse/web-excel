import {Observer} from '@core/Observer';

export function createObserver() {
    const observer = new Observer()
    
    return function(subject) {
        subject.observer = observer
        subject.unsubscribers = []
        subject.subscriptions = {}

        subject.$subscribe = (event, fn) => {
            subject.subscriptions[event] = fn
            subject.unsubscribers
                .push(subject.observer.subscribe(event, fn))
        }

        subject.$unsubscribe = event => {
            if (subject.subscriptions[event]) {
                subject.observer.unsubscribe(event,
                    subject.subscriptions[event])
            }
        }

        subject.$notify = (event, ...args) =>
            subject.observer.notify(event, ...args)

        subject.disposeObserver = () =>
            subject.unsubscribers.forEach(unsub => unsub())

        return subject
    }
}
