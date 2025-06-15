import React, { useState } from 'react';
import { IonCard, IonCardContent, IonButton, IonLabel, IonCheckbox, IonItem } from '@ionic/react';

interface TareaProps {
    id: number;
    nombre: string;
    descripcion?: string;
    fechaLimite?: string;
    prioridad: string;
    onEliminar: (id: number) => void;
}

const Tarea: React.FC<TareaProps> = ({ id, nombre, descripcion, fechaLimite, prioridad, onEliminar }) => {
    //   const [completa, setCompleta] = useState(false);
    // Estado local de la tarea
    const [completa, setCompleta] = useState(false);
    const [progreso, setProgreso] = useState(0); // Puedes manejar el progreso como un número de 0 a 100

    // Función para marcar la tarea como completa o incompleta
    const toggleCompleta = () => {
        setCompleta(!completa);
    };

    // Función para actualizar el progreso (por ejemplo, podrías tener una barra de progreso)
    const actualizarProgreso = (nuevoProgreso: number) => {
        setProgreso(nuevoProgreso);
    };

    return (
        <IonCard>
            <IonCardContent>
                <IonItem>
                    <IonLabel className="ion-text-center">
                        <h2>{nombre}</h2>
                        <p>{descripcion}</p>
                        <small>Fecha: {fechaLimite}</small>
                        <div><strong>Prioridad: </strong>{prioridad}</div>
                    </IonLabel>
                    <IonCheckbox checked={completa} onIonChange={toggleCompleta} slot="start" />
                    <IonButton color="danger" onClick={() => onEliminar(id)}>
                        Eliminar
                    </IonButton>
                </IonItem>
            </IonCardContent>
        </IonCard>
    );
};

export default Tarea;
