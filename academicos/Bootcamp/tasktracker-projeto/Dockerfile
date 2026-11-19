# Imagem base leve com Python 3.11
FROM python:3.11-slim

# Pasta de trabalho dentro do container
WORKDIR /app

# Mostra a saída do Python na hora (sem buffer) e evita gerar arquivos .pyc
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Copia apenas o código-fonte da aplicação
COPY src/ /app/src/

# Comando executado ao iniciar o container
CMD ["python", "src/main.py"]
