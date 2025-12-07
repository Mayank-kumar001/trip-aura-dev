MATCH (p:Place {name:"Chhatarpur Temple"}), 
      (t:Tag {name:"Religious"}), 
      (c:Category {name:"Temple"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"ISKCON Temple"}), 
      (t:Tag {name:"Religious"}), 
      (c:Category {name:"Temple"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Birla Mandir"}), 
      (t:Tag {name:"Religious"}), 
      (c:Category {name:"Temple"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Nizamuddin Dargah"}), 
      (t:Tag {name:"Cultural"}), 
      (c:Category {name:"Temple"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Gurudwara Sis Ganj Sahib"}), 
      (t:Tag {name:"Religious"}), 
      (c:Category {name:"Temple"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Agrasen ki Baoli"}), 
      (t:Tag {name:"Historical"}), 
      (c:Category {name:"Monument"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Mehrauli Archaeological Park"}), 
      (t:Tag {name:"Historical"}), 
      (c:Category {name:"Park"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Purana Qila"}), 
      (t:Tag {name:"Historical"}), 
      (c:Category {name:"Monument"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Jantar Mantar"}), 
      (t:Tag {name:"Heritage"}), 
      (c:Category {name:"Monument"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Rashtrapati Bhavan"}), 
      (t:Tag {name:"Historical"}), 
      (c:Category {name:"Landmark"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Safdarjung Tomb"}), 
      (t:Tag {name:"Historical"}), 
      (c:Category {name:"Monument"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Jama Masjid"}), 
      (t:Tag {name:"Cultural"}), 
      (c:Category {name:"Temple"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Bangla Sahib Gurudwara"}), 
      (t:Tag {name:"Religious"}), 
      (c:Category {name:"Temple"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Khan Market"}), 
      (t1:Tag {name:"Shopping"}), 
      (t2:Tag {name:"Food"}),
      (c:Category {name:"Market"})
CREATE (p)-[:HAS_TAG]->(t1)
CREATE (p)-[:HAS_TAG]->(t2)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Museum of Illusions"}), 
      (t1:Tag {name:"Adventure"}), 
      (t2:Tag {name:"Cultural"}), 
      (c:Category {name:"Museum"})
CREATE (p)-[:HAS_TAG]->(t1)
CREATE (p)-[:HAS_TAG]->(t2)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Lotus Temple"}), 
      (t:Tag {name:"Peaceful"}), 
      (c:Category {name:"Temple"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Akshardham Temple"}), 
      (t1:Tag {name:"Religious"}), 
      (t2:Tag {name:"Cultural"}), 
      (c:Category {name:"Temple"})
CREATE (p)-[:HAS_TAG]->(t1)
CREATE (p)-[:HAS_TAG]->(t2)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Hauz Khas Village"}), 
      (t1:Tag {name:"Food"}), 
      (t2:Tag {name:"Cultural"}), 
      (t3:Tag {name:"Romantic"}), 
      (c:Category {name:"Hidden Gem"})
CREATE (p)-[:HAS_TAG]->(t1)
CREATE (p)-[:HAS_TAG]->(t2)
CREATE (p)-[:HAS_TAG]->(t3)
CREATE (p)-[:HAS_CATEGORY]->(c);


MATCH (p:Place {name:"India Gate"}), (t:Tag {name:"Historical"}), (c:Category {name:"Landmark"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Red Fort"}), (t:Tag {name:"Historical"}), (c:Category {name:"Monument"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Qutub Minar"}), (t:Tag {name:"Heritage"}), (c:Category {name:"Monument"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Humayun's Tomb"}), (t:Tag {name:"Heritage"}), (c:Category {name:"Landmark"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Lodhi Garden"}), (t:Tag {name:"Nature"}), (c:Category {name:"Park"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Garden of Five Senses"}), (t:Tag {name:"Peaceful"}), (c:Category {name:"Park"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Sanjay Van (Cycling)"}), (t:Tag {name:"Adventure"}), (c:Category {name:"Hidden Gem"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Connaught Place"}), (t:Tag {name:"Shopping"}), (c:Category {name:"Market"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Chandni Chowk"}), (t:Tag {name:"Food"}), (c:Category {name:"Market"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Sarojini Nagar Market"}), (t:Tag {name:"Shopping"}), (c:Category {name:"Market"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);

MATCH (p:Place {name:"Dilli Haat"}), (t:Tag {name:"Cultural"}), (c:Category {name:"Market"})
CREATE (p)-[:HAS_TAG]->(t)
CREATE (p)-[:HAS_CATEGORY]->(c);
