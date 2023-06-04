-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('OWNER', 'GERENT', 'EMPLOYEES');

-- CreateTable
CREATE TABLE "Vehicles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "carId" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "chassiNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clients" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pswhs" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "enterpriseId" TEXT,
    "convenioId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enterprises" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fantasyName" TEXT NOT NULL,
    "corporationEmail" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "cnpj" TEXT NOT NULL,
    "accessKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Enterprises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Employees" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "pswhs" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "responsabity" "Priority" NOT NULL DEFAULT 'EMPLOYEES',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "cost" DOUBLE PRECISION NOT NULL,
    "color" TEXT,
    "components" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supliers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supliers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Convenios" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "enterpriseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Convenios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductSupiers" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "suplierId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductSupiers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductMovements" (
    "id" TEXT NOT NULL,
    "productid" TEXT[],
    "quantity" INTEGER[],
    "description" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductMovements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductSales" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductSales_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Clients_email_key" ON "Clients"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Enterprises_corporationEmail_key" ON "Enterprises"("corporationEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Enterprises_cnpj_key" ON "Enterprises"("cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Employees_email_key" ON "Employees"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Supliers_cnpj_key" ON "Supliers"("cnpj");

-- AddForeignKey
ALTER TABLE "Clients" ADD CONSTRAINT "Clients_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprises"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clients" ADD CONSTRAINT "Clients_convenioId_fkey" FOREIGN KEY ("convenioId") REFERENCES "Convenios"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Convenios" ADD CONSTRAINT "Convenios_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSupiers" ADD CONSTRAINT "ProductSupiers_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSupiers" ADD CONSTRAINT "ProductSupiers_suplierId_fkey" FOREIGN KEY ("suplierId") REFERENCES "Supliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
