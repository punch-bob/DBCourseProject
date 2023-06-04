# Project description
Спортивная инфраструктура города представлена спортивными сооружениями различного типа: спортивные залы, манежи, стадионы, корты и т.д. Каждая из категорий спортивных сооружений обладает атрибутами, специфичными только для нее: стадион характеризуется вместимостью, корт - типом покрытия.

Спортсмены под руководством тренеров занимаются отдельными видами спорта, при этом один и тот же спортсмен может заниматься несколькими видами спорта, и в рамках одного и того же вида спорта может тренироваться у нескольких тренеров. Все спортсмены объединяются в спортивные клубы, при этом каждый из них может выступать только за один клуб.

Организаторы соревнований проводят состязания по отдельным видам спорта на спортивных сооружениях города. По результатам участия спортсменов в соревнованиях производится награждение.

# Mandatory queries
* Получить перечень спортивных сооружений указанного типа в целом или удовлетворяющих заданным характеристикам (например, стадионы, вмещающие не менее указанного числа зрителей).
* Получить список спортсменов, занимающихся указанным видом спорта в целом либо не ниже определенного разряда.
* Получить список спортсменов, тренирующихся у некого тренера в целом либо не ниже определенного разряда.
* Получить список спортсменов, занимающихся более чем одним видом спорта с указанием этих видов спорта.
* Получить список тренеров указанного спортсмена.
* Получить перечень соревнований, проведенных в течение заданного периода времени в
целом либо указанным организатором.
* Получить список призеров указанного соревнования.
* Получить перечень соревнований, проведенных в указанном спортивном сооружении в
целом либо по определенному виду спорта.
* Получить перечень спортивных клубов и число спортсменов этих клубов, участвовавших в
спортивных соревнованиях в течение заданного интервала времени.
* Получить список тренеров по определенному виду спорта.
* Получить список спортсменов, не участвовавших ни в каких соревнованиях в течение
определенного периода времени.
* Получить список организаторов соревнований и число проведенных ими соревнований в
течение определенного периода времени.
* Получить перечень спортивных сооружений и даты проведения на них соревнований в
течение определенного периода времени.

# Data base scheme
![alt text](https://github.com/punch-bob/DBCourseProject/blob/main/db-scheme.jpg)