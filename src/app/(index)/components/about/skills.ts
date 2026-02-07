export type Skill = {
  name: string
  logo: string
  alt: string
  imageClassName?: string
}

export const programmingSkills: Skill[] = [
  { name: 'Ruby', logo: '/logos/ruby.svg', alt: 'Ruby' },
  { name: 'Golang', logo: '/logos/go.svg', alt: 'Go' },
  { name: 'Python', logo: '/logos/python.svg', alt: 'Python' },
  { name: 'TypeScript', logo: '/logos/typescript.svg', alt: 'TypeScript' },
  {
    name: 'Ruby on Rails',
    logo: '/logos/ruby-on-rails.svg',
    alt: 'Ruby on Rails',
  },
  { name: 'Gin', logo: '/logos/gin.png', alt: 'Gin' },
  { name: 'FastAPI', logo: '/logos/fastapi.svg', alt: 'FastAPI' },
  { name: 'Node.js', logo: '/logos/nodejs.png', alt: 'Node.js' },
]

export const toolsSkills: Skill[] = [
  { name: 'PostgreSQL', logo: '/logos/postgresql.svg', alt: 'PostgreSQL' },
  { name: 'Redis', logo: '/logos/redis.svg', alt: 'Redis' },
  {
    name: 'Kafka',
    logo: '/logos/kafka.svg',
    alt: 'Kafka',
    imageClassName: 'invert-0 in-[.dark]:invert',
  },
  { name: 'MongoDB', logo: '/logos/mongodb.svg', alt: 'MongoDB' },
  { name: 'Nginx', logo: '/logos/nginx.png', alt: 'Nginx' },
  { name: 'GraphQL', logo: '/logos/graphql.svg', alt: 'GraphQL' },
  {
    name: 'ELK',
    logo: '/logos/elk.svg',
    alt: 'ELK',
  },
  { name: 'Prometheus', logo: '/logos/prometheus.svg', alt: 'Prometheus' },
]

export const infraSkills: Skill[] = [
  {
    name: 'AWS',
    logo: '/logos/aws.svg',
    alt: 'AWS',
  },
  {
    name: 'GCP',
    logo: '/logos/gcp.svg',
    alt: 'GCP',
  },
  { name: 'Docker', logo: '/logos/docker.svg', alt: 'Docker' },
  { name: 'Kubernetes', logo: '/logos/kubernetes.svg', alt: 'Kubernetes' },
  { name: 'Terraform', logo: '/logos/terraform.svg', alt: 'Terraform' },
  { name: 'ArgoCD', logo: '/logos/argocd.svg', alt: 'ArgoCD' },
  {
    name: 'Jenkins',
    logo: '/logos/jenkins.svg',
    alt: 'Jenkins',
  },
  { name: 'Git', logo: '/logos/git.svg', alt: 'Git' },
]
