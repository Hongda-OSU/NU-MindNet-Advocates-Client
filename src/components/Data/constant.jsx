export const QUESTIONS = [
  "Imagine it's a Friday night and You are planning a fun party. Who do you think would be their top pick for an invite?",
  "Considering the diverse needs of university students, such as course selection, major determination, and the pursuit of career opportunities, who is likely to be the primary source of guidance for You in navigating these challenges?",
  "As a university student, you may encounter difficulties in your personal romantic relationships. In these situations, whom would You turn to for a discussion or guidance?",
  "Given the unique challenges and opportunities of university life, who do you think You will most likely consider as a potential roommate either living in university dorms or living in one apartment off-campus? ",
  "As college students, team projects are an integral part of your academic life. Who do you believe you are most likely to partner with for a collaborative project?",
];

export const CLASSIFICATION_CRITERIA =
  "Based on the statistics (degree, closeness, eigenvector centrality, and reciprocity), we can calculate the values for these statistics and the rankings for all nodes in the network. We classify the level of centrality based on the percentile of the user node. Specifically, if the user ranks top ⅓, we classify it as high. Similar for medium and low.";

export const DEGREES = {
  low: "You possess a low level of degree centrality within your social network, ranking in the bottom third of all actors. You occupy a peripheral rather than a central position. It means you have fewer connections than expected and may have difficulties establishing new and meaningful connections.",
  medium:
    "You possess a medium level of degree centrality within your social network, ranking in the middle third of all actors. You occupy a fairly central position, but not the most influential or connected one. It indicates that you have been able to establish meaningful relationships with some individuals. Still, there exist other more influential players in your network that may outweigh your centrality position.",
  high: "You possess a high level of degree centrality within your network, ranking in the top third of all actors. You have acquired a significant position by establishing meaningful and stable relationships with others. The high popularity of your position typically indicates that you have a healthy and mutual relationship network.",
};

export const CLOSENESS = {
  low: "You possess a low level of closeness centrality within your network, ranking in the bottom third of all actors. You are relatively isolated within your network, indicating limited ability to directly influence or access the broader network. It’s possible that you primarily rely on someone else to stay connected within this network.",
  medium:
    "You possess a medium level of closeness centrality within your network, ranking in the middle third of all actors. You can interact with other groups, but there are individuals that you may find difficult to reach. There are more influential individuals in your network who have demonstrated a more central position than you.",
  high: "You possess a high level of closeness centrality within your network, ranking in the top third of all actors. This position enables you to interact with others quickly and efficiently. As a key figure in maintaining network cohesion, you have demonstrated a remarkable ability to gather and exchange information across the network.",
};

export const EIGENVECTOR_CENTRALITY = {
  low: "You possess a low level of eigenvector centrality within your network, ranking in the bottom third of all actors. You are relatively isolated within your network and your connections are primarily with less central or influential members of the network. Your ability to access and distribute information or resources across the network is more restricted.",
  medium:
    "You possess a medium level of eigenvector centrality within your network, ranking in the middle third of all actors. You are connected to a mixed cohort of well-connected people and less central people in your network. It allows you to have access to resources from various sources, but may not be able to extend your influence far beyond.",
  high: "You possess a high level of eigenvector centrality within your network, ranking in the top third of all actors. This position indicates that you are strongly connected to many other well-connected people in your network. You are very likely to be able to extend your influence beyond your immediate network through your connections to these key members.",
};

export const RECIPROCITY = {
  low: "You possess a high level of reciprocity within your network, ranking in the top third of all actors. This position indicates that you are often mutually connected with other people. When you consider other people, they are likely to think of you in return, indicating a strong and stable relationship within your network.",
  medium:
    "You possess a medium level of reciprocity within your network, ranking in the middle third of all actors. You have a decent amount of mutual connections with other people, but there might still be room to establish new mutual relationships.",
  high: "You possess a high level of eigenvector centrality within your network, ranking in the top third of all actors. This position indicates that you are strongly connected to many other well-connected people in your network. You are very likely to be able to extend your influence beyond your immediate network through your connections to these key members.",
};

export const DESCRIPTIONS = [
  "Academic collaboration network visualization",
  "Academic collaboration network visualization based on gender",
  "Academic collaboration network visualization based on age"
]