export type Skill = {
  name: string
  logo: string
  alt: string
}

export const languageSkills: Skill[] = [
  { name: 'Ruby', logo: '/logos/ruby.png', alt: 'Ruby' },
  { name: 'Go/Golang', logo: '/logos/go.png', alt: 'Go' },
  { name: 'Python', logo: '/logos/python.png', alt: 'Python' },
  { name: 'TypeScript/JavaScript', logo: '/logos/typescript.png', alt: 'TypeScript' },
]

export const frameworkSkills: Skill[] = [
  { name: 'Ruby on Rails', logo: '/logos/rails.png', alt: 'Ruby on Rails' },
  { name: 'Gin', logo: '/logos/gin.png', alt: 'Gin' },
  { name: 'FastAPI', logo: '/logos/fastapi.png', alt: 'FastAPI' },
  { name: 'Node.js', logo: '/logos/node.png', alt: 'Node.js' },
]

export const toolsSkills: Skill[] = [
  { name: 'Kafka', logo: '/logos/kafka.png', alt: 'Kafka' },
  { name: 'Redis', logo: '/logos/redis.png', alt: 'Redis' },
  { name: 'PostgreSQL', logo: '/logos/postgresql.png', alt: 'PostgreSQL' },
  { name: 'MongoDB', logo: '/logos/mongodb.png', alt: 'MongoDB' },
  { name: 'GraphQL', logo: '/logos/graphql.png', alt: 'GraphQL' },
  { name: 'ELK (Elasticsearch, Logstash, Kibana)', logo: '/logos/elk.png', alt: 'ELK' },
  { name: 'Prometheus', logo: '/logos/prometheus.png', alt: 'Prometheus' },
  { name: 'Nginx', logo: '/logos/nginx.png', alt: 'Nginx' },
]

export const infraSkills: Skill[] = [
  { name: 'AWS (RDS, SQS, EKS, EC2, S3, IAM, SSM)', logo: '/logos/aws.png', alt: 'AWS' },
  {
    name: 'GCP (Cloud Run, Cloud Storage, Cloud SQL, GKE, Pub/Sub, IAM)',
    logo: '/logos/gcp.png',
    alt: 'GCP',
  },
  { name: 'Terraform', logo: '/logos/terraform.png', alt: 'Terraform' },
  { name: 'Docker', logo: '/logos/docker.png', alt: 'Docker' },
  { name: 'Kubernetes', logo: '/logos/kubernetes.png', alt: 'Kubernetes' },
  { name: 'ArgoCD', logo: '/logos/argocd.png', alt: 'ArgoCD' },
  { name: 'Git', logo: '/logos/git.png', alt: 'Git' },
  { name: 'CI/CD (Jenkins, GitHub Actions)', logo: '/logos/cicd.png', alt: 'CI/CD' },
]
