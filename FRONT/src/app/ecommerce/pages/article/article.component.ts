import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  article = [
    {
      port: 'https://www.consalud.es/uploads/s1/10/91/16/6/medica-en-su-consulta-foto-freepik.jpeg',
      title: 'El proyecto Invernadero de Mar gana el Premio Nacional al Talento Joven',
      day: '11',
      month: 'Ago',
      content: `La estudiante de segundo semestre del programa de Administración de Empresas de la Universidad de La Guajira, Nailyng Karing Giovannetty Fontalvo, resultó ganadora con el estudio Invernadero de Mar en el marco del lanzamiento de la segunda versión del Premio Nacional al Talento Joven. Un evento organizado por el Gobierno Nacional, encabezado por María Juliana Ruíz Sandoval, primera dama del país, la Fundación Solidaridad por Colombia y One Young World, con el apoyo financiero de 15 empresas aliadas.

        La investigación a cargo de la alumna busca dar soluciones a los problemas de alimentación para los niños en el departamento de La Guajira, el cual cuenta también con el apoyo de estudiantes y egresados del Colegio Livio Regilnado Fischione. Nailyng  Giovannetty Fontalvo indicó que “la propuesta fue ganadora del Premio Zayed a la Sostenibilidad y tiene como objetivo ayudar a las comunidades a generar oportunidades de desarrollo”.

        Asimismo, manifestó que el trabajo Invernadero de Mar no necesitará del manejo de las fuentes de agua de las poblaciones, pero, producirá un excedente para que puedan utilizarlas para sus necesidades diarias. Resaltó que esta es una tecnología innovadora que permite aprovechar el potencial de los vientos, la energía solar y el agua de mar siendo muy abundantes en las zonas desérticas y semidesérticas.
       
          Por otro lado, la joven reveló que su participación fue a través de una convocatoria a la cual se inscribieron más de mil 200 personas, donde cada región estaba patrocinada por diferentes empresas privadas. En el caso de Nailyng Giovannetty Fontalvo, contó con el patrocinio de la compañía Alejandría, dirigida y fundada por Luís Javier Castro Lachner.

        La estudiante agradeció a Uniguajira por el apoyo y dijo que “aunque apenas estoy iniciando mi carrera, tengo una visión muy amplia sobre el pregrado y lo que puede llegar a aportarme, las bases de este me brindan el liderazgo necesario para el fortalecimiento de mis habilidades y en los procesos que estoy llevando a cabo” y puntualizó que “el programa de Administración de Empresa tiene un pensum sólido y ejemplar”.<br><br>
        Igualmente, manifestó sentirse honrada con este reconocimiento al demostrar el talento joven colombiano. “El país tiene mucho potencial y esta distinción que tuve puede ser una inspiración para aquellos que tienen sus ideas para generar impacto en sus territorios y así hacer un gran cambio juntos” destacó la adolescente.<br><br>
        Para finalizar, Nailyng Giovannetty Fontalvo señaló que este premio es una iniciativa para dar paso a otros proyectos y así mostrar las capacidades con las que cuentan los jóvenes guajiros. Reconoció además se agradecimiento a la Consejería Presidencial para las Juventudes por la recompensa otorgada al trabajo realizado por el equipo de investigación. 

        Liz Carrillo Barros 

        Periodista Uniguajira`

    }

  ]


  constructor() { }



  ngOnInit(): void {
  }

}
