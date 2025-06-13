import React, { useRef, useState } from 'react';
import {
  IonItem,
  IonList,
  IonSelect,
  IonSelectOption,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonCol,
  IonGrid,
  IonRow
} from '@ionic/react';
import ListaDeTareas from '../components/ListaDeTareas';

const Home: React.FC = () => {
  const tareaRef = useRef<HTMLIonInputElement>(null);
  const tareaDes = useRef<HTMLIonInputElement>(null);
  let fechaActual: Date = new Date();
  let valorPrioridad: string = "Media";

  const [tareas, setTareas] = useState([
    {
      id: 1,
      nombre: 'Estudiar React',
      descripcion: 'Revisar hooks y contexto',
      fechaLimite: fechaActual.getDate() +
        "/" +
        (fechaActual.getMonth() + 1) +
        "/" +
        +fechaActual.getFullYear() +
        " " +
        +fechaActual.getHours() +
        ":" +
        +fechaActual.getMinutes(),
      // fechaLimite: '2025-02-02',
      prioridad: 'Media'
    },
  ]);

  const agregarTarea = () => {
    // const descripcion = tareaRef.current?.value as string;
    const tituloTarea = tareaRef.current?.value as string;
    const DesTarea = tareaDes.current?.value as string;
    if (tituloTarea) {
      const nuevaTarea = {
        id: tareas.length + 1,
        // nombre: `Nueva tarea ${tareas.length + 1}`,
        nombre: tituloTarea,
        descripcion: DesTarea,
        fechaLimite: fechaActual.getDate() +
          "/" +
          (fechaActual.getMonth() + 1) +
          "/" +
          +fechaActual.getFullYear() +
          " " +
          +fechaActual.getHours() +
          ":" +
          +fechaActual.getMinutes(),
        prioridad: valorPrioridad,
      };
      setTareas([...tareas, nuevaTarea]);
      tareaRef.current!.value = ""; // Limpiar el input después de agregar
      tareaDes.current!.value = ""; // Limpiar el input después de agregar
    }
  };

  const eliminarTarea = (id: number) => {
    const nuevasTareas = tareas.filter((tarea) => tarea.id !== id);
    setTareas(nuevasTareas);
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">Lista de Tareas</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" fullscreen>
        <div className="ion-text-center">

          <IonList>
            <IonItem lines="none">
              <div style={{ width: '100%', textAlign: 'center' }}>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonInput
                        ref={tareaRef}
                        placeholder="Titulo de la nueva tarea"
                        style={{ maxWidth: '300px', margin: '0 auto' }}
                      />
                    </IonCol>
                    <IonCol size='2'>
                      <IonSelect
                        placeholder="Prioridad"
                        interface="popover" // Opcional: se ve más lindo en centro
                        style={{ maxWidth: '99px', margin: '0 auto' }}
                        onIonChange={(event) => valorPrioridad = event.detail.value}
                      >
                        <IonSelectOption value="Alta">Alta</IonSelectOption>
                        <IonSelectOption value="Media">Media</IonSelectOption>
                        <IonSelectOption value="Baja">Baja</IonSelectOption>
                      </IonSelect>
                    </IonCol>
                  </IonRow>
                  <IonInput
                    ref={tareaDes}
                    placeholder="Descripcion de la nueva tarea"
                    style={{ maxWidth: '300px', margin: '0 auto' }}
                  />
                </IonGrid>

              </div>
            </IonItem>
          </IonList>
          <IonButton
            expand="block"
            onClick={agregarTarea}
            style={{ marginTop: '16px', maxWidth: '350px', marginLeft: 'auto', marginRight: 'auto' }}
          >
            Agregar Nueva Tarea
          </IonButton>
        </div>

        <ListaDeTareas tareas={tareas} onEliminar={eliminarTarea} />
      </IonContent>

    </IonPage>
  );
};

export default Home;
